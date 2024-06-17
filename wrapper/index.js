import { addWrapper, wrap } from "./wrapper.js";

addWrapper(Number.prototype, {
    isEven() {
        return this.value % 2 == 0;
    }
})

window.result = wrap(123)
