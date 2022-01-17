import { DynamicObject } from "../interfaces/DynamicObject";
import { entryOf } from "../types/entryOf";
import { exactEntryOf } from "../types/exactEntryOf";
import { keyList } from "../types/keyList";

export class BetterObject<T> implements DynamicObject<T> {

    public static assign<T, U>(target: T, ...sources: U[]): T & U {
        // Tricking the compiler because merging 2 types by reference isn't truly possible
        sources.forEach((source) => Object.entries(source).forEach(([key, value]) => target[<keyof T>key] = value));

        return <T & U>target;
    }

    public static merge<T>(target: T, ...sources: T[]): T {
        sources.forEach((source) => BetterObject.entries(source).forEach(([key, value]) => target[key] = value));
        
        return target;
    }

    public static softMerge<T>(target: T, ...sources: T[]): T {
        sources.forEach((source) => BetterObject.entries(source).filter(([key]) => !target[key]).forEach(([key, value]) => target[key] = value));
        
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
            keysRemaining.reverse().forEach((key) => target.splice(<number>key, 1));
        } else {
            keysRemaining.forEach((key) => delete target[key]);
        }

        return target;
    }

    public static create<T>(object: T): BetterObject<entryOf<T>> {
        return new BetterObject(BetterObject.assign({}, object));
    }
    
    public static keys<T>(object: T): keyList<T> {
        return <keyList<T>>Object.keys(object);
    }

    public static values<T>(object: T): entryOf<T>[] {
        return Object.values(object);
    }

    public static entries<T>(object: T): [keyof T, entryOf<T>][] {
        return BetterObject.keys(object).map((key) => [<keyof T>key, object[<keyof T>key]]);
    }

    public static fromEntries<T>(entries: [keyof T, entryOf<T>][]): T {
        return entries.reduce((target, [key, value]) => {
            target[key] = value;

            return target;
        }, <T>{});
    }

    public static getProperty<T, K extends keyof T>(object: T, key: K): exactEntryOf<T, K> {
        return object[key];
    }

    public static setProperty<T, K extends keyof T>(object: T, key: K, value: exactEntryOf<T, K>): T {
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