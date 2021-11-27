export class InvalidPathException extends Error {

    constructor() {
        super("The path is invalid");

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}