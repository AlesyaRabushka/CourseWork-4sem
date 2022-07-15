
function f_func(F, i, j, m)
{
    let result = 1;
    for (let k = 0; k < m; k += 1) {
        result *= F[i][j][k];
    }
    return result;
}

function d_func(D, i, j, m)
{
    let result = 1;
    for (let k = 0; k < m; k += 1) {
        result *= 1 - D[i][j][k];
    }
    return 1 - result;
}

/////////////////////////////////////

// f ^ d
function  f_and_d(D, F, i, j, m)
{
    // if (f_func(F, i, j, m) <= d_func(D, i,j,m))
    //     return f_func(F, i, j, m)
    // else
    //     return d_func(F,i,j,m)
    return (f_func(F, i, j, m) * d_func(D, i,j,m))

}
///////////////////////////////////////

// a -> b
function a_to_b(A, B, k, i, j)
{
    //return A[i][k] * (B[k][j] - 1) + 1;
    return Math.max((1 - A[i][k]), B[k][j]);
}

// b -> a
function b_to_a(A, B, k, i, j)
{
    //return B[k][j] * (A[i][k] - 1) + 1;
    return Math.max((1 - B[k][j]), A[i][k])
}

// a ^ b
function a_and_b(A, B, i, j, k)
{
    //let res = A[i][k] * B[k][j];
    let res = Math.min(A[i][k], B[k][j])
    // if (res < 0)
    //     res = 0.;
    return res;
}



///////////////////////////////////


// d_ijk
function Dijk(A, B, i, j, k)
{
    return a_and_b(A, B, i, j, k);
}

// f_ijk
function Fijk(A, B, E, i, j ,k) {
    return (a_to_b(A, B, k, i,j) * (2. * E[k] - 1.) * E[k] + b_to_a(A, B, k, i, j) * (1. + (4. * a_to_b(A, B, k, i, j) - 2.) * E[k]) * (1. - E[k]));
}


// c_ij
function Cij(D, F, G, i, j, m)
{
    return f_func(F, i, j, m) * (3 * G[i][j] - 2) * G[i][j] + (d_func(D, i, j, m) + (4. * f_and_d(D, F, i, j, m) - 3. * d_func(D, i, j, m)) * G[i][j]) * (1 - G[i][j]);
}

module.exports = {
    Fijk,
    Dijk,
    Cij,
}