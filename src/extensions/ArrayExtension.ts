interface Array<T> {
    add(this: T[], value: T): void;
    addRange(this: T[], values: T[]): void;
    count: number;
}

Array.prototype.add = function<T>(this: T[], value: T) {
    this.push(value);
}

Array.prototype.addRange = function<T>(this: T[], values: T[]) {
    values.forEach(value => {
        this.push(value);
    });
}

Object.defineProperty(Array.prototype, "count", {
    get<T> (this: T[]) {
        return this.length;
    }
});
