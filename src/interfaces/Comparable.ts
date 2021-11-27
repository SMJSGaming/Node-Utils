export interface Comparable<T> {
    compare: (compareTo: T) => boolean
}