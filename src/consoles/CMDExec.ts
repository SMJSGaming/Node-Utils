import { existsSync, mkdirSync, writeFileSync } from "fs";
import { exec } from "child_process";
import { parse } from "path";

import { DevConsole } from "./DevConsole";

export class CMDExec {

    public readonly status: Promise<boolean>;

    constructor(command: string, outFile?: string) {
        if (process.env.UTIL_LOGS == "1" || process.env.UTIL_LOGS?.toLowerCase() == "true") {
            DevConsole.info("Executing \x1b[36m%s\x1b[0m", command);
        }

        this.status = new Promise((resolve) => exec(command, (error, stdout, stderr) => {
            if (outFile) {
                if (!existsSync(outFile)) {
                    mkdirSync(parse(outFile).dir, { recursive: true });
                }

                writeFileSync(outFile, error?.message || stderr || stdout, { encoding: "utf-8" });
            }

            resolve(!error && !stderr);
        }));
    }
}