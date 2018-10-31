import { testForEcho } from './helper_functions';

const ctx: Worker = self as any;
// Respond to message from parent thread
ctx.addEventListener("message", (event) => {
    console.log(event);
    ctx.postMessage({ foo: "foo" });
})