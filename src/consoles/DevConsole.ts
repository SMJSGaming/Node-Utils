import { format } from "util";

import { parameterCallback } from "../types/parameterCallback";
import { BetterObject } from "../objects/BetterObject";
import { LogInfo } from "../interfaces/LogInfo";

export class DevConsole {

    private static CAPTURES: string[] = [];

    private static LISTENERS: BetterObject<parameterCallback<string, void>[]> = {};

    public static log<T, U>(message: T, ...params: U[]): void {
        DevConsole.send({
            name: "log",
            colorId: 34,
            method: console.log
        }, message, ...params);
    }

    public static info<T, U>(message: T, ...params: U[]): void {
        DevConsole.send({
            name: "info",
            colorId: 34,
            method: console.info
        }, message, ...params);
    }

    public static warn<T, U>(message: T, ...params: U[]): void {
        DevConsole.send({
            name: "warning",
            colorId: 33,
            method: console.warn
        }, message, ...params);
    }

    public static debug<T, U>(message: T, ...params: U[]): void {
        DevConsole.send({
            name: "debug",
            colorId: 36,
            method: console.debug
        }, message, ...params);
    }

    public static error<T, U>(message: T, ...params: U[]): void {
        DevConsole.send({
            name: "error",
            colorId: 31,
            method: console.error
        }, message, ...params);
    }

    public static success<T, U>(message: T, ...params: U[]): void {
        DevConsole.send({
            name: "success",
            colorId: 32,
            method: console.log
        }, message, ...params);
    }

    public static trace<T, U>(message: T, ...params: U[]): void {
        DevConsole.send<T, U | string>({
            name: "error",
            colorId: 31,
            method: console.error
        }, message, ...params, "\n", new Error().stack?.split("\n").slice(2).join("\n").slice(1) || "Missing stack");
    }

    public static traceInfo<T, U>(message: T, ...params: U[]): void {
        DevConsole.send<T, U | string>({
            name: "trace",
            colorId: 34,
            method: console.info
        }, message, ...params, "\n", new Error().stack?.split("\n").slice(2).join("\n").slice(1) || "Missing stack");
    }

    public static assert<T>(assertion: boolean, ...params: T[]): void {
        if (assertion) {
            DevConsole.success("Successful assertion", ...params);
        } else {
            DevConsole.trace("Assertion failed", ...params);
        }
    }

    public static clear(): void {
        console.clear();
        DevConsole.CAPTURES.splice(0, DevConsole.CAPTURES.length);

        DevConsole.send({
            name: "clear",
            colorId: 32,
            method: console.info
        }, "The console was cleared");
    }

    public static getOutput(): string[] {
        return DevConsole.CAPTURES;
    }

    public static on(event: string, callback: parameterCallback<string, void>): void {
        if (DevConsole.LISTENERS[event]) {
            DevConsole.LISTENERS[event].push(callback);
        } else {
            DevConsole.LISTENERS[event] = [ callback ];
        }
    }

    private static send<T, U>(logType: LogInfo<string, U | string | number>, message: T, ...params: U[]): void {
        const date = new Date();
        const output = format(`\x1b[34m%s\x1b[0m | [\x1b[%dm%s\x1b[0m]: %s`,
            new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset())).toLocaleString("en-GB"),
            logType.colorId,
            logType.name.toUpperCase(), 
            format(message, ...params))

        DevConsole.CAPTURES.push(output);
        logType.method(output);
        DevConsole.emit("output", output);
        DevConsole.emit(logType.name, output);
    }

    private static emit(event: string, message: string = ""): void {
        DevConsole.LISTENERS[event]?.forEach((callback, index) => {
            try {
                callback(message);
            } catch (error) {
                // Handling destroyed callbacks
                DevConsole.LISTENERS[event].splice(index, 1);
            }
        });
    }
}