export interface ICompleteData {
    zeroPoint: number;
    stepByStepSolution: { a: string, b: string }[];
    a: string;
    b: string;
    epsilon: string;
    fn: (x: number) => number;
}