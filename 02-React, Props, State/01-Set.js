// Set should contain a list of unique values and should support add, delete, and inclusion
// It should also have the ability to get its size
class Set {
    constructor(arr) {
        this.arr = arr;
    }

    add(val) {
        if (!this.has(val)) this.arr.push(val);
    }

    delete(val) {
        this.arr = this.arr.filter(x => x !== val);
    }

    has(val) {
        return this.arr.includes(val);
    }

    get size() {
        return this.arr.length;
    }
}

const s = new Set([1, 2, 3, 4, 5]);

s.add(1);
console.log(s);
console.log(s.has(1));
console.log(s.has(99));