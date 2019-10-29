import { EnumRuleOperand } from "../enums/EnumRuleOperand";
import { OperandPlus } from "../operands/OperandPlus";

declare interface IRuleOperand<R, P> {
    CreateOperand(enumOperandType: EnumRuleOperand): IRuleOperand<R, P>;
}

IRuleOperand.prototype.CreateOperand = (enumOperandType: EnumRuleOperand) => {
    switch (enumOperandType) {
        case EnumRuleOperand.Plus:
            return new OperandPlus();
        default:
            throw new Error(`${enumOperandType} is not supported!`);
    }
}

export default {};