class HashTable {
  constructor(size) {
    this.table = new Array(size);
  }

  hashFunction(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash + value.charCodeAt(i) * i) % this.table.length;
    }
    return hash;
  }

  // add items to the hash HashTable
  set(key, value) {
    let memoryLocation = this.hashFunction(key);
    if (!this.table[memoryLocation]) {
      this.table[memoryLocation] = [];
    }
    this.table[memoryLocation].push([key, value]);
    return this.table;
  }

  // get items to the hash HashTable
  getItems(key) {
    let memoryLocation = this.hashFunction(key);
    if (!this.table[memoryLocation]) return null;

    return this.table[memoryLocation].find((x) => x[0] === key)[1];
  }
}
export {HashTable};

/*
const m = new Map();
m.set('snail', 100);
const r = m.get('snail');

for (let [key, value] of m) {
  console.log(`${key} = ${value}`);
}
*/