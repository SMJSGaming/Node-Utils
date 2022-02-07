export class CantBeConstructor extends Error {

    constructor() {
        super("This class can't be constructed");

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}