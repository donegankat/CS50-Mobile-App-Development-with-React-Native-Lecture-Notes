class MySet extends Set {
    constructor(arr) {
        super(arr); // Run the original Set constructor
        this.originalArray = arr;
    }

    add(val) {
        super.add(val);
        console.log(`Added ${val} to the set!`);
    }

    toArray() {
        return Array.from(this);
    }

    reset() {
        return new MySet(this.originalArray);
    }
}

const s = new MySet([1, 2, 3, 4, 5]);

s.add(1);
console.log(s);
console.log(s.has(1));
console.log(s.has(99));

s.reset();
console.log(s.toArray());