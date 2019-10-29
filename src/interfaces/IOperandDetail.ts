import { EnumRuleOperand } from "../enums/EnumRuleOperand";

export interface IOperandDetail {
    OperandKey: string;
    OperandName: string;
    OperandEnum: EnumRuleOperand;
    OperandDescription?: string;
}