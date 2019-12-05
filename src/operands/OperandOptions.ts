import { EnumRuleOperand } from "../enums/EnumRuleOperand";
import { OperandPlus } from "../operands/OperandPlus";
import { IRuleOperand } from "../interfaces/IRuleOperand";
import { OperandData } from "./OperandData";

export class OperandOptions {
    static CreateOperand(enumOperandType: EnumRuleOperand, data?: any): IRuleOperand<any, any> | undefined {
        switch (enumOperandType) {
            case EnumRuleOperand.Plus:
                return new OperandPlus();
            case EnumRuleOperand.Data:
                return new OperandData(data);
            default:
                return undefined;
        }
    };
};