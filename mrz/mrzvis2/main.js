const readline = require('readline');
const matrix = require('./matr');
const task = require('./task');

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
})

const promisify = (func, question) => {
    return new Promise((resolve, reject) => {
        func(String(question), (data) => { input.pause(); resolve(data); });
    });
}

async function start() {
    let A, B, E, G, F, D, C;
    let m, p, q, n, r;
    let timeOfSumm = 1, timeOfDifference = 1, timeOfMultiplying = 1, timeOfCom = 1;
    let callsOfSumm = 0, callsOfDifference = 0, callsOfMultiplying = 0, callsOfCom = 0;
    let T1 = 0, Tn = 0, Ky = 0, Eff = 0, Diff = 0, Lavg = 0;

    // matrixes sizes
    m = Number(await promisify(input.question.bind(input), 'm: '));
    p = Number(await promisify(input.question.bind(input), 'p: '));
    q = Number(await promisify(input.question.bind(input), 'q: '));
    n = Number(await promisify(input.question.bind(input), 'n: '));
    // rang
    r = p * m * q;

    // generate matrix
    A = matrix.generateMatrix(p, m, matrix.random);
    B = matrix.generateMatrix(m, q, matrix.random);
    E = matrix.generateMass(m, matrix.random);
    G = matrix.generateMatrix(p, q, matrix.random);

    // show in console
    console.log('Table A:')
    console.table(A);
    console.log('Table B:')
    console.table(B);
    console.log('Table E:')
    console.table({ 0: E });
    console.log('Table G:')
    console.table(G);

    F = matrix.generateCubeMatrix(p, q, m, (i, j, k) => {
        callsOfMultiplying += 7;
        callsOfDifference += 3;
        callsOfSumm += 2;
        callsOfCom += 3;
        return task.Fijk(A, B, E, i, j, k);
    });

    let reductionTime = 3 * (timeOfMultiplying + timeOfDifference + timeOfSumm);
    let operationTime = 7 * timeOfMultiplying + 3 * timeOfDifference + 2 * timeOfSumm;
    Tn += (reductionTime + operationTime) * Number(r / n);

    D = matrix.generateCubeMatrix(p, q, m, (i, j, k) => {
        callsOfCom += 1;
        callsOfMultiplying += 1;
        return task.Dijk(A, B, i, j, k);
    });

    Tn += timeOfMultiplying * Number(r / n);

    C = matrix.generateMatrix(p, q, (i, j) => {
        // Cij
        callsOfMultiplying += 8;
        callsOfDifference += 3;
        callsOfSumm += 2;

        // f_func
        callsOfMultiplying += m - 1;

        // d_func
        callsOfDifference += m + 1;
        callsOfMultiplying += m - 1;
        callsOfDifference += 1;

        // d_func
        // d_func
        // f_func
        callsOfDifference += m + 1;
        callsOfMultiplying += m - 1;
        callsOfDifference++;
        callsOfDifference += m + 1;
        callsOfMultiplying += m - 1;
        callsOfDifference++;
        callsOfMultiplying += m - 1;

        return task.Cij(D, F, G, i, j, m);
    });

    // generate time
    let FTime = 2 * timeOfMultiplying * (m - 1);
    let DTime = 3 * (timeOfDifference * (m + 1) + timeOfMultiplying * (m - 1));
    operationTime = 8 * timeOfMultiplying + 4 * timeOfDifference + 2 * timeOfSumm;
    Tn += (FTime + DTime + operationTime) * Number((p * q) / n);

    T1 = timeOfSumm * callsOfSumm + timeOfDifference * callsOfDifference + timeOfMultiplying * callsOfMultiplying + timeOfCom * callsOfCom;


    if (Tn > T1) {
        Tn = T1;
    }
    Ky = T1 / Tn;

    Eff = Ky / n;

    // D
    Lavg = timeOfMultiplying * r;

    // F
    Lavg += (7 * timeOfMultiplying + 3 * timeOfDifference + 2 * timeOfSumm) * r;

    // C
    Lavg += (8 * timeOfMultiplying + 3 * timeOfDifference + 2 * timeOfSumm) * p * q;

    // a ^ b
    Lavg += (timeOfCom + timeOfSumm + timeOfDifference) * (m - 1) * 2 * p * q;
    // D_func
    Lavg += (timeOfMultiplying * (m - 1) + timeOfDifference * (m + 1)) * 3 * p * q;
    // a -> b
    Lavg += (timeOfCom) * r * 3;

    Lavg = Math.trunc(Lavg / r);
    Diff = Tn / Lavg;

    const output = {
        T1,
        Tn,
        Ky,
        e: Eff,
        Lsum: Tn,
        Lavg,
        D: Diff,
    }

    console.log('-----RESULT-----')
    console.log('Table F:')
    console.table(F);

    console.log('Table D:')
    console.table(D);

    console.log('Table C:')
    console.table(C);



    console.table(output)
}

console.log('')
start();