import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { EnumOperandType } from "../enums/EnumOperandType";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";

// todos: veri tabanından operand tanımları alınacak.
export class CurrentOperandDefinitionsProvider {

  private static m_OperandDefinitions: IOperandDefinition[];
  get OperandDefinitions () {
    if (CurrentOperandDefinitionsProvider.m_OperandDefinitions == null) {
      CurrentOperandDefinitionsProvider.m_OperandDefinitions = this.GetAllOperandDefinitions();
    }
    return CurrentOperandDefinitionsProvider.m_OperandDefinitions;
  }

  GetAllOperandDefinitions () {
    const operandDefinitions: IOperandDefinition[] = [
      { OperandRegexStr: "\\(", OperandParRegexStr: "\\(([^()]*)\\)", Precedence: 1, Key: "()",
        Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: false,
        ThereIsRighParameter: false, IsGrouping: true, Description: "Grouping", },
      { OperandRegexStr: "\\s+in\\s+", OperandParRegexStr: "(«?\\w+»?)\\s+in\\s+(«\\w+»)",
        Precedence: 2, Key: "in (...)", EnumOperandType: EnumOperandType.In, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "In", },
      { OperandRegexStr: "\\s+not\\s+in\\s+", OperandParRegexStr: "(«?\\w+»?)\\s+not\\s+in\\s+(«\\w+»)",
        Precedence: 2, Key: "not in (...)", EnumOperandType: EnumOperandType.NotIn,
        Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Not In", },
      { OperandRegexStr: "!", OperandParRegexStr: "!(«?\\w+»?)", Precedence: 3, Key: "!",
        EnumOperandType: EnumOperandType.LogicalNot, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: false, ThereIsRighParameter: true, Description: "Logical NOT", },
      { OperandRegexStr: "\\*\\*", OperandParRegexStr: "(«?\\w+»?)\\s*\\*\\*\\s*(«?\\w+»?)",
        Precedence: 4, Key: "**", EnumOperandType: EnumOperandType.Exponentiation, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Exponentiation", },
      { OperandRegexStr: "\\*", OperandParRegexStr: "(«?\\w+»?)\\s*\\*\\s*(«?\\w+»?)",
        Precedence: 5, Key: "*", EnumOperandType: EnumOperandType.Multiply, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Multiplication", },
      { OperandRegexStr: "/", OperandParRegexStr: "(«?\\w+»?)\\s*/\\s*(«?\\w+»?)",
        Precedence: 5, Key: "/", EnumOperandType: EnumOperandType.Divide, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Division", },
      { OperandRegexStr: "%", OperandParRegexStr: "(«?\\w+»?)\\s*%\\s*(«?\\w+»?)",
        Precedence: 5, Key: "%", EnumOperandType: EnumOperandType.Remainder, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Remainder", },
      { Guid: "b7d11c30-4044-11ea-8cc9-6d4f591fd4bf", OperandRegexStr: "\\+", OperandParRegexStr: "(«?\\w+»?)\\s*\\+\\s*(«?\\w+»?)",
        Precedence: 6, Key: "+", EnumOperandType: EnumOperandType.Plus, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Addition", },
      { OperandRegexStr: "-", OperandParRegexStr: "(«?\\w+»?)\\s*-\\s*(«?\\w+»?)",
        Precedence: 6, Key: "-", EnumOperandType: EnumOperandType.Minus, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Subtraction", },
      { OperandRegexStr: "<", OperandParRegexStr: "(«?\\w+»?)\\s*<\\s*(«?\\w+»?)",
        Precedence: 7, Key: "<", EnumOperandType: EnumOperandType.SmallerThan, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Less Than", },
      { OperandRegexStr: "<=", OperandParRegexStr: "(«?\\w+»?)\\s*<=\\s*(«?\\w+»?)",
        Precedence: 7, Key: "<=", EnumOperandType: EnumOperandType.SmallerOrEqualThan,
        Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Less Than Or Equal", },
      { OperandRegexStr: ">", OperandParRegexStr: "(«?\\w+»?)\\s*>\\s*(«?\\w+»?)",
        Precedence: 7, Key: ">", EnumOperandType: EnumOperandType.BiggerThan, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Greater Than", },
      { OperandRegexStr: ">=", OperandParRegexStr: "(«?\\w+»?)\\s*>=\\s*(«?\\w+»?)",
        Precedence: 7, Key: ">=", EnumOperandType: EnumOperandType.BiggerOrEqualThan,
        Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true,
        ThereIsRighParameter: true, Description: "Greater Than Or Equal", },
      { OperandRegexStr: "==", OperandParRegexStr: "(«?\\w+»?)\\s*==\\s*(«?\\w+»?)",
        Precedence: 8, Key: "==", EnumOperandType: EnumOperandType.Equal, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Equality", },
      { OperandRegexStr: "!=", OperandParRegexStr: "(«?\\w+»?)\\s*!=\\s*(«?\\w+»?)",
        Precedence: 8, Key: "!=", EnumOperandType: EnumOperandType.NotEqual, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Inequality", },
      { OperandRegexStr: "===", OperandParRegexStr: "(«?\\w+»?)\\s*===\\s*(«?\\w+»?)",
        Precedence: 8, Key: "===", EnumOperandType: EnumOperandType.StrictEqual, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Strict Equality", },
      { OperandRegexStr: "!==", OperandParRegexStr: "(«?\\w+»?)\\s*!==\\s*(«?\\w+»?)",
        Precedence: 8, Key: "!==", EnumOperandType: EnumOperandType.StrictNotEqual,
        Direction: EnumOperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Strict Inequality", },
      { OperandRegexStr: "&", OperandParRegexStr: "(«?\\w+»?)\\s*&\\s*(«?\\w+»?)",
        Precedence: 9, Key: "&", EnumOperandType: EnumOperandType.BitwiseAnd, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Bitwise AND", },
      { OperandRegexStr: "\\^", OperandParRegexStr: "(«?\\w+»?)\\s*\\^\\s*(«?\\w+»?)",
        Precedence: 10, Key: "^", EnumOperandType: EnumOperandType.BitwiseXor, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Bitwise XOR", },
      { OperandRegexStr: "\\|", OperandParRegexStr: "(«?\\w+»?)\\s*\\|\\s*(«?\\w+»?)",
        Precedence: 11, Key: "|", EnumOperandType: EnumOperandType.BitwiseOr, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Bitwise OR", },
      { OperandRegexStr: "&&", OperandParRegexStr: "(«?\\w+»?)\\s*&&\\s*(«?\\w+»?)",
        Precedence: 12, Key: "&&", EnumOperandType: EnumOperandType.LogicalAnd, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Logical AND", },
      { OperandRegexStr: "\\|\\|", OperandParRegexStr: "(«?\\w+»?)\\s*\\|\\|\\s*(«?\\w+»?)",
        Precedence: 13, Key: "||", EnumOperandType: EnumOperandType.LogicalOr, Direction: EnumOperandDirection.LeftToRight,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Logical OR", },
      { OperandRegexStr: "=", OperandParRegexStr: "(«?\\w+»?)\\s*=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "=", EnumOperandType: EnumOperandType.Assignment, Direction: EnumOperandDirection.RightToLeft,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
      { OperandRegexStr: "\\+=", OperandParRegexStr: "(«?\\w+»?)\\s*\\+=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "+=", EnumOperandType: EnumOperandType.PlusAssignment, Direction: EnumOperandDirection.RightToLeft,
        ThereIsLeftParameter: true, ThereIsRighParameter: true, Description: "Assignment", },
      { OperandRegexStr: "-=", OperandParRegexStr: "(«?\\w+»?)\\s*-=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "-=", EnumOperandType: EnumOperandType.MinusAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "\\*\\*=", OperandParRegexStr: "(«?\\w+»?)\\s*\\*\\*=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "**=", EnumOperandType: EnumOperandType.ExponentiationAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "\\*=", OperandParRegexStr: "(«?\\w+»?)\\s*\\*=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "*=", EnumOperandType: EnumOperandType.MultiplyAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "/=", OperandParRegexStr: "(«?\\w+»?)\\s*/=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "/=", EnumOperandType: EnumOperandType.DivideAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "%=", OperandParRegexStr: "(«?\\w+»?)\\s*%=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "%=", EnumOperandType: EnumOperandType.RemainderAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "&=", OperandParRegexStr: "(«?\\w+»?)\\s*&=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "&=", EnumOperandType: EnumOperandType.BitwiseAndAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "\\^=", OperandParRegexStr: "(«?\\w+»?)\\s*\\^=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "^=", EnumOperandType: EnumOperandType.BitwiseXorAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
      { OperandRegexStr: "\\|=", OperandParRegexStr: "(«?\\w+»?)\\s*\\|=\\s*(«?\\w+»?)",
        Precedence: 14, Key: "|=", EnumOperandType: EnumOperandType.BitwiseOrAssignment,
        Direction: EnumOperandDirection.RightToLeft, ThereIsLeftParameter: true, ThereIsRighParameter: true,
        Description: "Assignment", },
    ];

    return operandDefinitions;
  }
  GetOperandDefinition (guid?: string, EnumOperandType?: EnumOperandType): IOperandDefinition | undefined {
    let operandDefinition: IOperandDefinition | undefined;
    if (guid != null) {
      operandDefinition = this.OperandDefinitions.find((o) => {
        return o.Guid === guid;
      });
    } else if (EnumOperandType != null) {
      operandDefinition = this.OperandDefinitions.find((o) => {
        return o.EnumOperandType === EnumOperandType;
      });
    }

    return operandDefinition;
  }

}
