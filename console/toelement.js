// import { checkInstance } from "./helpers.js";

let create = document.createElement.bind(document);

function htmlElementError() {
    return new TypeError("not an HTML element");
}

function br() {
    return create("br");
}

function text(data) {
    return new Text(data);
}

function span(text="") {
    let elem = create("span");
    elem.innerText = text;
    return elem;
}

function protoText(object) {
    let proto = Object.getPrototypeOf(object);
    if (proto != null) {
        return proto.constructor.name;
    }
    return "[null prototype]";
}

function objectToElement(object, name) {
    function onclick() {
        function onclick() {
            let elem = dataToElement(object);
            self.replaceWith(elem);
            elem.insertAdjacentElement("afterend", br());
        }
        name.classList.add("console-clickable");
        name.addEventListener("click", onclick);
        
        let self = span();
        let proto = Object.getPrototypeOf(object)

        let block = create("pre");
        block.classList.add("console-indent");
        
        self.appendChild(name);
        self.appendChild(block);

        for (const key of Object.getOwnPropertyNames(object)) {
            let desc = Object.getOwnPropertyDescriptor(object, key);
            block.appendChild(text(`${key}: `));

            if ("get" in desc) {
                function onclick() {
                    let expanded;
                    try {
                        expanded = dataToElement(getter.apply(object));
                    } catch (err) {
                        expanded = span(err);
                        expanded.classList.add("console-getter-error");
                    }
                    elem.replaceWith(expanded);
                }

                let getter = desc.get;
                let elem = span("(...)");
                elem.classList.add("console-clickable");
                elem.addEventListener("click", onclick);
                
                block.appendChild(elem);
                block.appendChild(br());
                continue;
            }

            block.appendChild(dataToElement(object[key]));
            block.appendChild(br());
        }
        block.appendChild(text("[[prototype]]: "));
        block.appendChild(dataToElement(proto));
        
        elem.replaceWith(self);
        
        let next = self.nextElementSibling;
        if (next != null) {
            self.parentElement.removeChild(next);
        }
    }

    let elem = span();
    elem.appendChild(name);
    elem.classList.add("console-clickable");
    elem.addEventListener("click", onclick);
    return elem;
}

export function dataToElement(data) {
    let elem;
    let type = data == Function.prototype ? "object" : typeof data;
    switch (type) {
        case "string":
            data = data
                .replaceAll("\\", "\\\\")
                .replaceAll('"', '\\"')
                .replaceAll("\n", "\\n");
            data = `"${data}"`;
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
            elem = span(data);
            break;
        case "undefined":
            elem = span("undefined");
            break;
        case "object":
            if (data !== null) {
                return objectToElement(data, span(protoText(data)));
            }
            elem = span("null");
            break;
        case "function":
            elem = span(`f ${data.name}()`);
            elem.classList.add(`console-type-function`);
            return objectToElement(data, elem);
    }

    elem.classList.add(`console-type-${type}`);
    return elem;
}
