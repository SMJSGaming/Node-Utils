import { Stringifyer } from "../interfaces/Stringifyer";

export class Token implements Stringifyer {

    private repeats: number;

    constructor(repeats: number) {
        this.repeats = repeats;
    }

    public setRepeats(repeats: number) {
        this.repeats = repeats;
    }

    public toString(): string {
        return Array(this.repeats).map(() => Math.random().toString(36).substr(2)).join("");
    }
}