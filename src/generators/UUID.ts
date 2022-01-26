import { Stringifyer } from "../interfaces/Stringifyer";
import { callback } from "../types/callback";

export class UUID implements Stringifyer {

    public static create(): UUID {
        return new UUID();
    }

    public static getVersion(uuid: UUID | string): number {
        return parseInt((typeof uuid == "string" ? uuid : uuid.toString()).split("-")[2].charAt(0), 0x10);
    }

    public static getVariant(uuid: UUID | string): number {
        return parseInt((typeof uuid == "string" ? uuid : uuid.toString()).split("-")[3].charAt(0), 0x10);
    }

    private time: number;

    private randomAlgorithm: callback<number>;

    constructor(time: number = Date.now(), randomAlgorithm: callback<number> = Math.random) {
        this.time = time;
        this.randomAlgorithm = randomAlgorithm;
    }

    public updateTime(newTime: number = Date.now()): void {
        this.time = newTime;
    }

    public setRandomAlgorithm(randomAlgorithm: callback<number>): void {
        this.randomAlgorithm = randomAlgorithm;
    }

    public toString(): string {
        let timeBackup = this.time;

        return `xxxxxxxx-xxxx-4xxx-Nxxx-xxxxxxxxxxxx`.replace(/[xN]/g, (char) => {
            const random = (timeBackup + this.randomAlgorithm() * 0x10) % 0x10 | 0;

            timeBackup = Math.floor(timeBackup / 16);

            return (char == "x" ? random : random & 0x3 | 0x8).toString(0x10);
        });
    }
}