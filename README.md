# Web Libraries

**By [Gabe Schrock](https://github.com/gabeschrock)**

This is a collection of JavaScript libraries for the web. 

**Demo**: View on [Github Pages](https://gabeschrock.github.io/web-libs/) or host locally by cloning into `web-libs` and running `web-libs/node-server.js`

## Console - `/console`
```javascript
import { init } from "./path/to/web-libs/console/console.js";
init(document.getElementById("your-console-id"));
```
```javascript
import { initAsChild } from "./path/to/web-libs/console/console.js";
initAsChild(document.getElementById("your-console-container-id"));
```
A library for overwriting the default console and converting data to HTML elements. 

## Wrapper
```javascript
import { addWrapper, wrap } from "./path/to/web-libs/console/console.js";
```
