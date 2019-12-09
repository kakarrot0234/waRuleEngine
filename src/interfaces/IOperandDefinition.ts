import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
export interface IOperandDefinition {
    Precedence: number;
    Key: string;
    Enum?: EnumRuleNodeType;
    IsGrouping?: boolean;
    Direction?: EnumOperandDirection;
    ThereIsLeftParameter: boolean;
    ThereIsRighParameter: boolean;
    Description: string;
}
