import { JSONType } from "../types/JSONType";

export interface DynamicClass<T> extends Function {
    new (...args: JSONType[]): T
}