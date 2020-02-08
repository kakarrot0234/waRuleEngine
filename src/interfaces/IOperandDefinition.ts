import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { EnumOperandType } from "../enums/EnumOperandType";

export interface IOperandDefinition {
    Guid?: string;
    Precedence: number;
    Key: string;
    EnumOperandType?: EnumOperandType;
    IsGrouping?: boolean;
    Direction?: EnumOperandDirection;
    ThereIsLeftParameter: boolean;
    ThereIsRighParameter: boolean;
    Description: string;
    OperandRegexStr: string;
    OperandParRegexStr: string;
}
