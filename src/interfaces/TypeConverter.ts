import { RegisteredConverter } from "./RegisteredConverter";
import { DynamicClass } from "./DynamicClass";

export interface TypeConverter {
    classObject: DynamicClass<object>,
    converts: RegisteredConverter[]
}