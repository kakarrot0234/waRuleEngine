import { IOperandDefinition } from '../interfaces/IOperandDefinition';
import { EnumOperandDirection } from '../enums/EnumOperandDirection';

export const OperandDefinitions: IOperandDefinition[] = [
    { Precedence: 1, Key: "()", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, IsGrouping: true, },
    { Precedence: 2, Key: "!", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: false, ThereIsRighParameter: true, },
    { Precedence: 3, Key: "**", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 4, Key: "*", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 4, Key: "/", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 4, Key: "%", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 5, Key: "+", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 5, Key: "-", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: "<", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: "<=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: ">", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: ">=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "==", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "!=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "===", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "!==", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 8, Key: "&", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 9, Key: "^", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "+=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "-=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "**=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "*=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "/=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "%=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "&=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "^=", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, }
];
