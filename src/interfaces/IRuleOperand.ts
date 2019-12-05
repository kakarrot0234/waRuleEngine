export interface IRuleOperand<R, P> {
    OperandParameterLeft?: IRuleOperand<R, P | undefined> | undefined;
    OperandParameterRight?: IRuleOperand<R, P | undefined> | undefined;
    IsValid: () => { IsValid: boolean; Message?: string; };
    GetResult: () => R;
}
