export interface IRuleOperand<R, P> {
    OperandParameters: IRuleOperand<R, P | undefined>[];
    GetResult: () => R;
}