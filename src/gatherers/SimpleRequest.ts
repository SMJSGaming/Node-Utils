import { createWriteStream, existsSync, writeFileSync } from "fs";
import http, { ClientRequest, IncomingHttpHeaders } from "http";
import https from "https";

import { JSONPrimitive } from "../types/JSONPrimitive";
import { BetterObject } from "../objects/BetterObject";
import { DevConsole } from "../consoles/DevConsole";
import { urlOptions } from "../types/urlOptions";

export class SimpleRequest {

    public static queryParser(object: BetterObject<JSONPrimitive>): string {
        return Object.entries(object).map(([key, value]) => `${key}=${value}`).join("&");
    }

    public static stringifyUrl(url: urlOptions): string {
        if (typeof url == "string") {
            return url;
        } else if ("pathname" in url) {
            return url.href;
        } else {
            return new URL(url.path || "", ((url.protocol || "https:") + "//") + (url.host || url.hostname || "google.com")).href;
        }
    }

    public readonly urlOptions: urlOptions;

    public readonly postData?: string;

    constructor(urlOptions: urlOptions, postData?: string | BetterObject<JSONPrimitive>) {
        this.urlOptions = urlOptions;

        if (postData) {
            this.postData = typeof postData == "string" ? postData : SimpleRequest.queryParser(postData);
        }
    }

    public request(): Promise<string> {
        return new Promise((resolve, reject) => {
            const req = this.baseRequest((message) => {
                let fullMessage = "";

                message.on("data", (data) => fullMessage += data);
                message.once("end", () => {
                    if (process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true") {
                        DevConsole.info("Request finished with status \x1b[36m%d\x1b[0m", message.statusCode || 200);
                    }

                    resolve(fullMessage);
                });
            });

            req.once("error", reject);
            req.end();
        });
    }

    public headerRequest(): Promise<IncomingHttpHeaders> {
        return new Promise((resolve, reject) => {
            const req = this.baseRequest((message) => {
                if (process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true") {
                    DevConsole.info("Request finished with status \x1b[36m%d\x1b[0m", message.statusCode || 200);
                }

                resolve(message.headers);
            });

            req.once("error", reject);
            req.end();
        });
    }

    public download(filePath: string, streamOptions?: Parameters<typeof createWriteStream>[1]): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!existsSync(filePath)) {
                writeFileSync(filePath, "");
            }

            const stream = createWriteStream(filePath, streamOptions);
            const req = this.baseRequest((message) => {
                message.pipe(stream);
                message.once("end", () => {
                    if (process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true") {
                        DevConsole.info("Download finished with status \x1b[36m%d\x1b[0m", message.statusCode || 200);
                    }

                    resolve();
                });
            });

            stream.once("error", reject);
            req.once("error", reject);
            req.end();
        });
    }

    private baseRequest(handleCallback: Parameters<typeof http["request"]>[2]): ClientRequest {
        const stringUrl = SimpleRequest.stringifyUrl(this.urlOptions);

        if (process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true") {
            DevConsole.info("Requesting \x1b[36m%s\x1b[0m", stringUrl);
        }

        const req = (stringUrl.startsWith("https") ? https : http).request(this.urlOptions, handleCallback); 

        // These checks are to make sure that we're dealing with a RequestOptions object
        // because someone decided to make that a type instead of an interface
        if (this.postData && typeof this.urlOptions != "string" && "method" in this.urlOptions && this.urlOptions.method == "POST") {
            if (this.urlOptions.headers?.["Content-Type"] == "application/json") {
                req.write(this.postData);
            } else {
                const stringData = typeof this.postData == "string" ? this.postData : SimpleRequest.queryParser(this.postData);
            
                req.setHeader("Content-Length", stringData.length);
                req.write(stringData);
            }
        }

        return req;
    }
}