/**
 * This is a memory leak sample.
 */
const fs = require('fs');


/**
 * HERE is the variable which leaks memory.
 */
const leak = [];
class MyClass {
    constructor(str) {
        this.str = str;
    }
}
function func1(val) {
    // leak.push(val);
}
setInterval(() => {
    let randomData = Math.random().toString();
    func1(new MyClass(randomData));
}, 10);


/**
 * Check.
 */
let stats = [];
function checkMemory() {

    // gc.
    try {
        global.gc();
    } catch (e) {
        console.log('You have to run this program as `node --expose-gc app_memory_leak.js`');
        process.exit();
    }

    // Check heap memory.
    const heapUsed = process.memoryUsage().heapUsed;
    console.log('heapSize: ', heapUsed);

    // Output.
    stats.push(heapUsed);
    fs.writeFile('stats.json', JSON.stringify(stats), err => {
        if (err) {
            console.log(err);
        }
    });
}
setInterval(checkMemory, 1000);