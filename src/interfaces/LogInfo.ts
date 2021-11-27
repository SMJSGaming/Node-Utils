export interface LogInfo<T, U> {
    name: string,
    colorId: number,
    method: (message: T, ...params: U[]) => void
}