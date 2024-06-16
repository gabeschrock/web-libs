import { dataToElement } from "./toelement.js";

let consoleElement;

export class ConsoleInitError extends Error {
    static name = "ConsoleInitError";
    
    data = null;

    constructor(message, data=null) {
        super(message);
        this.data = data;
    }
}

let originalConsole = window.console;

let console = {
    log(...data) {
        for (const [index, item] of data.entries()) {
            let elem = dataToElement(item);
            consoleElement.appendChild(elem);
            if (index < data.length - 1) {
                consoleElement.appendChild(new Text(" "));
            }
        }
        consoleElement.appendChild(document.createElement("br"));
    }
}

export function init(consoleInit) {
    if (!(consoleInit instanceof HTMLPreElement)) {
        throw new ConsoleInitError("not a pre element", consoleInit)
    }
    consoleElement = consoleInit;
    window.originalConsole = originalConsole;
    window.console = console;
}

export function initAsChild(parentElement) {
    if (!(parentElement instanceof HTMLElement)) {
        throw new ConsoleInitError("not an element", parentElement)
    }
    let pre = document.createElement("pre");
    parentElement.appendChild(pre);
    init(pre);
}
