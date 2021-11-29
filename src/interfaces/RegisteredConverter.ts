import { parameterCallback } from "../types/parameterCallback";
import { DynamicClass } from "./DynamicClass";

export interface RegisteredConverter {
    classObject: DynamicClass<object>,
    converter: parameterCallback<any, any>
}