import { BetterObject } from "./BetterObject";

export class BetterArray<T> extends Array<T> {
    
    public static from<T>(array: T[]): BetterArray<T> {
        return new BetterArray(...array);
    }

    constructor(...entries: T[]) {
        super(...entries);
    }

    public async asyncForEach(callback: (value: T, index: number, array: BetterArray<T>) => Promise<void>, thisArg?: BetterObject<any>): Promise<void> {
        for (let i = 0; i < this.length; i++) {
            await callback.call(thisArg, this[i], i, this);
        }
    }

    public async asyncMap<U>(callback: (value: T, index: number, array: BetterArray<T>) => Promise<U>, thisArg?: BetterObject<any>): Promise<BetterArray<U>> {        
        const mapped = new BetterArray<U>();
        
        for (let i = 0; i < this.length; i++) {
            mapped.push(await callback.call(thisArg, this[i], i, this));
        }

        return mapped;
    }

    public async asyncFilter(callback: (value: T, index: number, array: BetterArray<T>) => Promise<boolean>, thisArg?: BetterObject<any>): Promise<BetterArray<T>> {
        const filtered = new BetterArray<T>();

        for (let i = 0; i < this.length; i++) {
            if (await callback.call(thisArg, this[i], i, this)) {
                filtered.push(this[i]);
            }
        }

        return filtered;
    }

    public async asyncReduce<U>(callback: (previousValue: U, currentValue: T, index: number, array: BetterArray<T>) => Promise<U>, initialValue: U, thisArg?: BetterObject<any>): Promise<U> {
        for (let i = 0; i < this.length; i++) {
            initialValue = await callback.call(thisArg, initialValue, this[i], i, this);
        }

        return initialValue;
    }

    /*public filterValue<U, Z>() {
        
    }*/

    // TODO: Add more utilities
}