import { IOperandDefinition } from '../interfaces/IOperandDefinition';
import { EnumOperandDirection } from '../enums/EnumOperandDirection';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';

export class CurrentOperandDefinitions {
    static OperandDefinitions: IOperandDefinition[] = [
        { Precedence: 1, Key: "()", Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, IsGrouping: true, Description: "Grouping" },
        { Precedence: 2, Key: "!", Enum: EnumRuleNodeType.Not, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: false, ThereIsRighParameter: true, Description: "Logical NOT", },
        { Precedence: 3, Key: "**", Enum: EnumRuleNodeType.Exponentiation, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Exponentiation", },
        { Precedence: 4, Key: "*", Enum: EnumRuleNodeType.Multiply, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Multiplication", },
        { Precedence: 4, Key: "/", Enum: EnumRuleNodeType.Divide, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Division", },
        { Precedence: 4, Key: "%", Enum: EnumRuleNodeType.Remainder, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Remainder", },
        { Precedence: 5, Key: "+", Enum: EnumRuleNodeType.Plus, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Addition", },
        { Precedence: 5, Key: "-", Enum: EnumRuleNodeType.Minus, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Subtraction", },
        { Precedence: 6, Key: "<", Enum: EnumRuleNodeType.SmallerThan, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Less Than", },
        { Precedence: 6, Key: "<=", Enum: EnumRuleNodeType.SmallerOrEqualThan, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Less Than Or Equal", },
        { Precedence: 6, Key: ">", Enum: EnumRuleNodeType.BiggerThan, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Greater Than", },
        { Precedence: 6, Key: ">=", Enum: EnumRuleNodeType.BiggerOrEqualThan, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Greater Than Or Equal", },
        { Precedence: 7, Key: "==", Enum: EnumRuleNodeType.Equal, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Equality", },
        { Precedence: 7, Key: "!=", Enum: EnumRuleNodeType.NotEqual, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Inequality", },
        { Precedence: 7, Key: "===", Enum: EnumRuleNodeType.StrictEqual, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Strict Equality", },
        { Precedence: 7, Key: "!==", Enum: EnumRuleNodeType.StrictNotEqual, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Strict Inequality", },
        { Precedence: 8, Key: "&", Enum: EnumRuleNodeType.BitwiseAnd, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Bitwise AND", },
        { Precedence: 9, Key: "^", Enum: EnumRuleNodeType.BitwiseXor, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Bitwise XOR", },
        { Precedence: 10, Key: "|", Enum: EnumRuleNodeType.BitwiseOr, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Bitwise OR", },
        { Precedence: 11, Key: "&&", Enum: EnumRuleNodeType.LogicalAnd, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Logical AND", },
        { Precedence: 12, Key: "||", Enum: EnumRuleNodeType.LogicalOr, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Logical OR", },
        { Precedence: 13, Key: "=", Enum: EnumRuleNodeType.Assignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "+=", Enum: EnumRuleNodeType.PlusAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "-=", Enum: EnumRuleNodeType.MinusAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "**=", Enum: EnumRuleNodeType.ExponentiationAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "*=", Enum: EnumRuleNodeType.MultiplyAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "/=", Enum: EnumRuleNodeType.DivideAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "%=", Enum: EnumRuleNodeType.RemainderAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "&=", Enum: EnumRuleNodeType.BitwiseAndAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "^=", Enum: EnumRuleNodeType.BitwiseXorAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
        { Precedence: 13, Key: "|=", Enum: EnumRuleNodeType.BitwiseOrAssignment, Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
    ];

    static FindOperandDefinitions(enumRuleNodeType: EnumRuleNodeType): IOperandDefinition | undefined {
        const findResult = this.OperandDefinitions.find(o => o.Enum === enumRuleNodeType);
        return findResult;
    }
}


