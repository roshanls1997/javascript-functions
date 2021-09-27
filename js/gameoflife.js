function seed() {
  const args = arguments;
  const result = [];
  for(let i = 0; i < args.length; i++) {
    result.push(args[i]);
  }
  return result;
}

function same([x, y], [j, k]) {
  return (x === j) && (y === k);
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  const state = this;
  const [ cx, cy ] = cell;
  for(let i = 0; i < state.length; i++) {
    const [ x, y ] = state[i];
    if(x === cx && y === cy) {
      return true;
    }
  }
  return false;
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {
  console.log('\n------------------', state);
  if(state.length === 0 || state === undefined) {
    return [];
  }
  let minX=Number.MAX_SAFE_INTEGER, maxX=0, minY=Number.MAX_SAFE_INTEGER, maxY=0;
  for(let i = 0; i < state.length; i++) {
    const [ tempX, tempY ] = state[i];
    if(tempX > maxX) {
      maxX = tempX;
    }
    if(tempY > maxY) {
      maxY = tempY;
    }
    if(tempY < minY) {
      minY = tempY;
    }
    if(tempX < minX) {
      minX = tempX;
    }
  }
  console.log(minX, maxX, minY, maxY, '\n --')
  return {
    topRight: [ maxX, maxY ],
    bottomLeft: [ minX, minY ]
  }

};

const printCells = (state) => {};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  module.exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;