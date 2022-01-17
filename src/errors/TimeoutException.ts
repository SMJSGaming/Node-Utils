export class TimeoutException extends Error {

    constructor() {
        super("The execution timed out");

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}