import { createReadStream, statSync } from "fs";
import http from "http";
import https from "https";
import { Extract } from "unzipper";

import { DevConsole } from "../consoles/DevConsole";
import { urlOptions } from "../types/urlOptions";
import { SimpleRequest } from "./SimpleRequest";

export class Unzipper {

    public readonly zipPath: urlOptions;

    public readonly outPath: string;

    constructor(zipPath: urlOptions, outPath: string) {
        this.zipPath = zipPath;
        this.outPath = outPath;
    }

    public urlUnzip(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const stringUrl = SimpleRequest.stringifyUrl(this.zipPath);
            const shouldLog = process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true";

            if (shouldLog) {
                DevConsole.info("Unzipping from \x1b[36m%s\x1b[0m to \x1b[36m%s\x1b[0m", stringUrl, this.outPath);
            }

            if (statSync(this.outPath).isDirectory()) {
                try {
                    (stringUrl.startsWith("https") ? https : http).request(this.zipPath, (message) => {
                        message.pipe(Extract({ path: this.outPath })).on("error", reject).on("close", () => {
                            if (shouldLog) {
                                DevConsole.info("Finished unzipping \x1b[36m%s\x1b[0m", stringUrl);
                            }

                            resolve(true);
                        });
                        message.on("data", () => 0 /* Node, I hate you so much for forcing me to do this bs */);
                        message.once("error", reject);
                    }).once("error", reject).end();
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(false);
            }
        });
    }

    public unzip(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (typeof this.zipPath == "string" && statSync(this.zipPath).isFile() && statSync(this.outPath).isDirectory()) {
                const shouldLog = process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true";
                if (shouldLog) {
                    DevConsole.info("Unzipping \x1b[36m%s\x1b[0m to \x1b[36m%s\x1b[0m", this.zipPath, this.outPath);
                }

                createReadStream(this.zipPath).pipe(Extract({ path: this.outPath })).on("error", reject).on("close", () => {
                    if (shouldLog) {
                        DevConsole.info("Finished unzipping \x1b[36m%s\x1b[0m", this.zipPath);
                    }

                    resolve(true)
                });
            } else {
                resolve(false);
            }
        });
    }
}