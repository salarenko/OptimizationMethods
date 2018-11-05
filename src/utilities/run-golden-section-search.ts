export const runGoldenSectionSearch = (fn, a, b, elipson): {
    zeroPoint: number;
    stepByStepSolution: any[];
} => {

    const stepByStepSolution = [];
    const k = (Math.sqrt(5) - 1) / 2;

    let xR = b - k;
    let xL = a + k;

    stepByStepSolution.push({a, b});
    debugger;

    while (Math.abs(b - a) > elipson) {

        if (fn(xL) < fn(xR)) {
            // wybierz przedział [a, xR]

            b = xR;
            xR = xL;
            xL = b - k * (b - a);
        } else {
            // wybierz przedział [xL, b]
            a = xL;
            xL = xR;
            xR = a + k * (b - a);
        }

        stepByStepSolution.push({a, b});
    }

    return {
        zeroPoint: (a + b) / 2,
        stepByStepSolution
    };
};
