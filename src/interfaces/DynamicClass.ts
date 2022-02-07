export interface DynamicClass<T, A extends Array<any> = any[]> extends Function {
    new (...args: A): T
}