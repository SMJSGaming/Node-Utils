import { DynamicObject } from "../interfaces/DynamicObject";
import { entryOf } from "../types/entryOf";
import { keyList } from "../types/keyList";

export class BetterObject<T> implements DynamicObject<T> {

    public static assign<T, U>(target: T, ...sources: U[]): T & U {
        // Tricking the compiler because merging 2 types by reference isn't truly possible
        sources.forEach((source) => Object.entries(source).forEach(([key, value]) => target[key as keyof T] = value));

        return target as T & U;
    }

    public static merge<T>(target: T, ...sources: T[]): T {
        sources.forEach((source) => 
            BetterObject.entries(source).forEach(([key, value]) => 
                target[key] = value));
        
        return target;
    }

    public static override<T>(target: T, ...sources: T[]): T {
        const keysRemaining: keyList<T> = BetterObject.keys(target);

        sources.forEach((source) => BetterObject.entries(source).forEach(([key, value]) => {
            const keyIndex = keysRemaining.indexOf(key);

            target[key] = value;

            if (keyIndex != -1) {
                keysRemaining.splice(keyIndex, 1);
            }
        }));

        if (Array.isArray(target)) {
            keysRemaining.reverse().forEach((key) => target.splice(key as number, 1));
        } else {
            keysRemaining.forEach((key) => delete target[key]);
        }

        return target;
    }

    public static create<T>(object: T): BetterObject<entryOf<T>> {
        return new BetterObject(BetterObject.assign({}, object));
    }
    
    public static keys<T>(object: T): keyList<T> {
        return Object.keys(object) as keyList<T>;
    }

    public static values<T>(object: T): entryOf<T>[] {
        return Object.values(object);
    }

    public static entries<T>(object: T): [keyof T, entryOf<T>][] {
        return BetterObject.keys(object).map((key) => [key as keyof T, object[key as keyof T]]);
    }

    public static fromEntries<T>(entries: [keyof T, entryOf<T>][]): T {
        return entries.reduce((target, [key, value]) => {
            target[key] = value;

            return target;
        }, {} as T);
    }

    public static getProperty<T, U extends entryOf<T>>(object: T, key: keyof T): U {
        return object[key] as U;
    }

    public static setProperty<T, U extends entryOf<T>>(object: T, key: keyof T, value: U): T {
        object[key] = value;

        return object;
    }

    public static is<T>(object1: T, object2: T): boolean {
        const entries1 = BetterObject.entries(object1);

        return entries1.length == BetterObject.entries(object2).length && 
            entries1.map(([key, value]) => object2[key] === value).every(Boolean);
    }

    [key: string]: T;

    constructor(object: BetterObject<T> | T[]) {
        BetterObject.merge(this, object);
    }
}