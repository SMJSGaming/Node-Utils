import { JSONType } from "../types/JSONType";

export interface DynamicClass<T extends object> extends Function {
    new (...args: JSONType[]): T
}