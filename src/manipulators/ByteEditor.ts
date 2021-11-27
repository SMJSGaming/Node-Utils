import { OutOfBoundsException } from "../errors/OutOfBoundsException";

export class ByteEditor {

    private readonly bytes: Buffer;

    constructor(bytes: Buffer) {
        this.bytes = bytes;
    }

    public getByte(address: number): number {
        if (address >= 0 && this.bytes.length > address) {
            return this.bytes[address];
        } else {
            throw new OutOfBoundsException();
        }
    }

    public getBytes(startAddress: number, endAddress: number): Buffer {
        if (startAddress >= 0 && this.bytes.length > endAddress && startAddress < endAddress) {
            return this.bytes.slice(startAddress, endAddress);
        } else {
            throw new OutOfBoundsException();
        }
    }

    public setByte(address: number, byte: number): void {
        if (byte >= 0 && byte <= 255 && this.bytes.length > address) {
            this.bytes[address] = byte;
        } else {
            throw new OutOfBoundsException();
        }
    }

    public setBytes(startAddress: number, bytes: number[] | Buffer): void {
        if (startAddress >= 0 && this.bytes.length > startAddress + bytes.length) {
            bytes.forEach((byte: number, index: number) => this.setByte(startAddress + index, byte));
        } else {
            throw new OutOfBoundsException();
        }
    }

    public testByte(address: number, testByte: number): boolean {
        return this.getByte(address) == testByte;
    }

    public testBytes(startAddress: number, testBytes: number[] | Buffer): boolean {
        return this.getBytes(startAddress, startAddress + testBytes.length).every((byte, index) => testBytes[index] == byte);
    }
}