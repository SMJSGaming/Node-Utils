export class Bitset {

    private readonly bytes: Uint8Array;

    constructor(defaultBit: boolean = false, length: number) {
        this.bytes = new Uint8Array(length).fill(+defaultBit);
    }

    public get(index: number): boolean {
        return (this.bytes[this.getByte(index)] & (1 << this.getBit(index))) == 1;
    }

    public set(index: number, bit: boolean): void {
        if (bit) {
            this.bytes[this.getByte(index)] |= (1 << this.getBit(index));
        } else {
            this.bytes[this.getByte(index)] &= ~(1 << this.getBit(index));
        }
    }

    public flip(index: number): void {
        this.set(index, !this.get(index));
    }

    // TODO: Add more utilities

    private getByte(index: number): number {
        return (index / 0x10) | 0;
    }

    private getBit(index: number): number {
        return index & 0xF;
    }
}