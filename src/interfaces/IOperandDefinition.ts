import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { EnumOperandType } from "../enums/EnumOperandType";

export interface IOperandDefinition {
    Guid?: string;
    Precedence: number;
    Key: string;
    EnumOperandType?: EnumOperandType;
    IsGrouping?: boolean;
    Direction?: EnumOperandDirection;
    ParameterCount?: number;
    Description: string;
    OperandRegexStr: string;
    OperandParRegexStr: string;
    KeysForComplexConversion?: (string | number)[];
}
