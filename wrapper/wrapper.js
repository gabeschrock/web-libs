let wrapped = new Map();

function protoText(object) {
    let proto = Object.getPrototypeOf(object);
    if (proto != null) {
        return proto.constructor.name;
    }
    return "`null`";
}

class DefaultWrapper {
    #value;

    constructor(value) {
        this.#value = value;
    }

    get value() {
        return this.#value;
    }

    set value(newValue) {
        const protoOf = Object.getPrototypeOf;
        if (protoOf(newValue) != protoOf(this.#value)) {
            throw new TypeError(
                `not same prototype: ${protoText(this.#value)}, ${protoText(newValue)}`
            );
        }
        this.#value = newValue;
    }
}

export function addWrapper(proto, props) {
    if (typeof proto == "function" && proto != Function.prototype) {
        proto = proto.prototype;
    }
    if (typeof proto != "object" || proto == Function.prototype) {
        return false;
    }
    class Wrapper extends DefaultWrapper {
        static type = proto;
        /*
        constructor(value) {
            super(value);
        }
        */
    }

    for (const key of Object.getOwnPropertyNames(props)) {
        if (key == "constructor") {
            continue;
        }
        const desc = Object.getOwnPropertyDescriptor(props, key);
        Object.defineProperty(Wrapper.prototype, key, desc)
    }

    wrapped.set(proto, Wrapper);
    return true;
}

export function wrap(data) {
    if (wrapped.has(data)) {
        const Wrapper = wrapped.get(data);
        return new Wrapper(data);
    }
    let proto = Object.getPrototypeOf(data);
    if (proto == null) {
        return null;
    }
    while (!wrapped.has(proto)) {
        proto = Object.getPrototypeOf(proto);
        if (proto == null) {
            return null;
        }
    }
    const Wrapper = wrapped.get(proto);
    return new Wrapper(data);
}
