import { init } from "./console.js";

init(document.getElementById("console"));

const log = console.log;

log("This is an HTML console.");
log("It can log any primitive type...");
log(123);
log(true);
log(undefined);
log(null);
log("It can also log multiple values, just like the real console.");
log(123, 456);
log(123, "456", false);
log("Objects! And prototypes!");
log({
    foo: 5,
    bar: "hello world",
    isAwesome: true,
    anotherObject: {
        foo: 10
    }
});
log(function heyLookItsAFunction() {})
log("Circular objects are fine...")
let object = {
    message: "Have fun expanding this!"
};
object.self = object;
log(object);
log("Objects will update upon expand!ng.")
object = {
    counter: 0,
    get clickMe() {
        this.counter++;
        return "try collapsing and expanding this object"
    },
    get clickMeToo() {
        throw new Error("Whoops!");
    }
}
log(object);
