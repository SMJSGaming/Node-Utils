export class OutOfBoundsException extends Error {

    constructor() {
        super("The provided value is out of bounds");

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}