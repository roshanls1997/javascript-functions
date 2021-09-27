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
  if(state.length === 0 || state === undefined) {
    return {
      topRight: [ 0, 0 ],
      bottomLeft: [ 0, 0]
    };
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
  return {
    topRight: [ maxX, maxY ],
    bottomLeft: [ minX, minY ]
  }

};

const printCells = (state) => {
  let ans = '';
  const { topRight: [maxX, maxY], bottomLeft: [minX, minY] } = corners(state);
  for(let j = maxY; j >= minY; j--) {
    for(let i = minX; i <= maxX; i++) {
      ans += (printCell([i, j], state));
    }
    ans += '\n';
  }
  return ans;
};

const getNeighborsOf = ([x, y]) => {
  const ans = [];
  for(let ty = y+1; ty >= y-1; ty--) {
    for(let tx = x-1; tx <= x+1; tx++) {
      if(tx === x && ty === y) {
        continue;
      }
      ans.push([tx, ty]);
    }
  }
  return ans;

};

const getLivingNeighbors = (cell, state) => {
  const cellNeighbours = getNeighborsOf(cell);
  const ans = [];
  for(let i = 0; i < cellNeighbours.length; i++) {
    const [cx, cy] = cellNeighbours[i];
    if(contains.bind(state)([cx, cy])) {
      ans.push([cx, cy]);
    }
  }
  return ans;
};

const willBeAlive = (cell, state) => {
  const cellNeighbours = getLivingNeighbors(cell, state);
  return cellNeighbours.length === 3 || (cellNeighbours.length === 2 && contains.call(state, cell))
};

const calculateNext = (state) => {
  const {topRight: [maxX, maxY], bottomLeft: [minX, minY]} = corners(state);
  const newState = [];
  for(let y = minY-1; y <= maxY+1; y++) {
    for(let x = minX-1; x <= maxX+1; x++) {
      if(willBeAlive([x,y], state)) {
        newState.push([x, y]);
      }
    }
  }
  return newState;
};

const iterate = (state, iterations) => {
  const ans = [];
  ans.push(state);
  for(let i = 0; i < iterations; i++) {
    const nextState = calculateNext(ans[ans.length-1]);
    ans.push(nextState);
  }
  return ans;
};

const main = (pattern, iterations) => {
  const result = iterate(startPatterns[pattern], iterations);
  result.forEach(state => console.log(printCells(state)));
};

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