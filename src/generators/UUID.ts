// import { networkInterfaces } from "os";

import { Comparable } from "../interfaces/Comparable";
import { callback } from "../types/callback";

export class UUID implements Comparable<UUID> {

    public static generateV1(): UUID {
        return new UUID(false);
    }

    public static generateV4(): UUID {
        return new UUID(true);
    }

    public static getVersion(uuid: UUID | string): number {
        return parseInt((typeof uuid == "string" ? uuid : uuid.toString()).split("-")[2].charAt(0), 0x10);
    }

    public static getVariant(uuid: UUID | string): number {
        return parseInt((typeof uuid == "string" ? uuid : uuid.toString()).split("-")[3].charAt(0), 0x10);
    }

    private readonly v4: boolean;

    private time: number;

    private randomAlgorithm: callback<number>;

    constructor(v4: boolean = false, time: number = Date.now(), randomAlgorithm: callback<number> = Math.random) {
        this.v4 = v4;
        this.time = time;
        this.randomAlgorithm = randomAlgorithm;
    }

    public updateTime(newTime: number = Date.now()): void {
        this.time = newTime;
    }

    public setRandomAlgorithm(randomAlgorithm: callback<number>): void {
        this.randomAlgorithm = randomAlgorithm;
    }

    public compare(compareTo: UUID): boolean {
        return this.toString() == compareTo.toString();
    }

    public toString(): string {
        let timeBackup = this.time;

        if (this.v4) {
            return `xxxxxxxx-xxxx-4xxx-Nxxx-xxxxxxxxxxxx`.replace(/[xN]/g, (char) => {
                const random = (timeBackup + this.randomAlgorithm() * 0x10) % 0x10 | 0;

                timeBackup = Math.floor(timeBackup / 16);

                return (char == "x" ? random : random & 0x3 | 0x8).toString(0x10);
            });
        } else {
            //const macAddress = Object.values(networkInterfaces()).filter((net) => net?.[0]?.mac != "00:00:00:00:00:00")[0]?.[0]?.mac.replace(/:/g, "") || "000000000000";

            // TODO: Finish v1

            return "";
        }
    }
}