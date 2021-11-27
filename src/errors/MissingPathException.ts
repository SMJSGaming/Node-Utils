export class MissingPathException extends Error {

    constructor() {
        super("A required path couldn't be located");

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}