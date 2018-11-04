export function preparePlotFunction(formula: string): (x: number) => number {

    formula = formula.replace(/ /g, '');
    const addition = formula.split('+')
        .map(phrase => {
                let value = null;
                let exponent = null;
                let hasParameter = null;

                if ((phrase.indexOf('x') !== -1) && (phrase.indexOf('^') !== -1)) {
                    const values = phrase.split('^');

                    exponent = values[1];
                    hasParameter = true;
                    value = values[0].replace('x', '');

                } else if (phrase.indexOf('x') !== -1) {
                    const values = phrase.split('x');
                    exponent = 1;
                    value = values[0];
                    hasParameter = true;

                } else {
                    value = phrase;
                }
                return {value, exponent, hasParameter};
            }
        );

    return (x: number) => {
        return addition.reduce((fnValue, fnPart) => {
            fnValue += (Number(fnPart.value) || 1) * (fnPart.hasParameter ? Math.pow(x, fnPart.exponent) : 1);
            return fnValue;
        }, 0);
    };
}
