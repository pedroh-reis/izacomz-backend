export function JSON2Object<T>(input: string): T {
    return JSON.parse(input)
}

export function object2JSON<T>(input: T): string {
    return JSON.stringify(input)
}