import { EnumRuleOperand } from "../enums/EnumRuleOperand";

export interface IRuleOperand<R, P> {
    Operand: EnumRuleOperand;
    OperandParameters: IRuleOperand<R, P>[];
    GetResult: () => R;
}