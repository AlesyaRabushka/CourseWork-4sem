function generateMatrix(m, n, fill) {
    const NewMatrix = [];

    for (let i = 0; i < m; i += 1) {
        NewMatrix.push([]);
        for (let j = 0; j < n; j += 1) {
            if (fill instanceof Function) {
                NewMatrix[i].push(fill(i, j));
            } else {
                NewMatrix[i].push(fill);
            }
        }
    }

    return NewMatrix;
}

function generateMass(m, fill) {
    const newMass = [];

    if (fill !== null) {
        for (let i = 0; i < m; i += 1) {
            if (fill instanceof Function) {
                newMass.push(fill(i));
            } else {
                newMass.push(fill);
            }
        }
    }

    return newMass;
}

function generateCubeMatrix(m, n, p, fill) {
    const NewMatrix = [];

    for (let i = 0; i < m; i += 1) {
        NewMatrix.push([]);
    }

    for (let i = 0; i < m; i += 1) {
        for (let j = 0; j < n; j += 1) {
            NewMatrix[i].push([]);
            for (let k = 0; k < p; k += 1) {
                if (fill instanceof Function) {
                    NewMatrix[i][j].push(fill(i, j, k));
                } else {
                    NewMatrix[i][j].push(fill);
                }
            }
        }
    }

    return NewMatrix;
}

function random() {
    let num = Math.random() - ((Math.random() > 0.5) ? 1: 0);

    return num;
}

module.exports = {
    generateMatrix,
    generateMass,
    generateCubeMatrix,
    random,
}