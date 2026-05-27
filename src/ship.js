function Ship(length, name) {
  let hits = 0;

  return {
    hit() {
      hits++;
    },
    isSunk() {
      return hits >= length;
    },
    getLength() {
      return length;
    },
    getName() {
      return name;
    },
    getHits() {
      return hits;
    }    
  };
}

module.exports = Ship;