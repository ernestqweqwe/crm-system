export const objectDiff = <T extends Record<string, unknown>>(
    obj1: T,
    obj2: Partial<T>
): Partial<T> => {
    const resultObject: Partial<T> = {}
    ;(Object.keys(obj1) as Array<keyof T>).forEach((key) => {
        if (obj1[key] !== obj2[key]) {
            resultObject[key] = obj2[key]
        }
    })
    return resultObject
}
