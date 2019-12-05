import { EnumOperandDirection } from "../enums/EnumOperandDirection";
export interface IOperandDefinition {
    Precedence: number;
    Key: string;
    IsGrouping?: boolean;
    Direction?: EnumOperandDirection;
    ThereIsLeftParameter: boolean;
    ThereIsRighParameter: boolean;
}
