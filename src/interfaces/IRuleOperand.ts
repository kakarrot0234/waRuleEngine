export interface IRuleOperand<R, P> {
    OperandParameterLeft?: IRuleOperand<R, P | undefined>;
    OperandParameterRight?: IRuleOperand<R, P | undefined>;
    IsValid: () => { IsValid: boolean; Message?: string; };
    GetResult: () => R;
}
