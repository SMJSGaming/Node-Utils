export class UnregisteredConversionException extends Error {

    constructor() {
        super("An unregistered type was provided");

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}