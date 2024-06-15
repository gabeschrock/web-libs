let defaultError = Object.freeze(new TypeError("type error"));

export function checkInstance(
    object,
    targetClass,
    error=defaultError
) {
    if (typeof targetClass != "object") {
        throw new TypeError(`not an object: ${targetClass}`)
    }
    if (!(object instanceof targetClass)) {
        switch (typeof error) {
            case "function":
                throw error();
            case "object":
                throw error;
            default:
                throw new TypeError(`not an instance of ${targetClass.constructor.name}`)
        }
    }
}
