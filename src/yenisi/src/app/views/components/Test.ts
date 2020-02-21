import { EnumOperandType, } from "../../../uBkrVeriOperasyonu/enums/EnumOperandType";
import axios from 'axios';
import { IOperandType, } from '../../../uBkrVeriOperasyonu/interfaces/IOperandType';
import * as uuid from 'uuid';
import { IOperandDefinition, } from "../../../uBkrVeriOperasyonu/interfaces/IOperandDefinition";
import { EnumOperandDirection, } from '../../../uBkrVeriOperasyonu/enums/EnumOperandDirection';

export async function addOperandTypes () {
  const enumKeys: IOperandType[] = [];
  for (const enumValue in EnumOperandType) {
    const enumNum = parseInt(enumValue);
    if (isNaN(enumNum)) {
      enumKeys.push({
        Guid: uuid.v1(),
        EnumKey: enumValue,
      });
    }
  }
  await axios.post("http://localhost:8080/OperandTypes", enumKeys);
}
export async function addOperandDefinitons () {
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

  const datas = await Promise.all(operandDefinitions.map(async (o) => {
    let operandTypeRef: string | undefined;
    if (o.EnumOperandType != null) {
      const response = await axios.get(`http://localhost:8080/OperandTypes/ByEnumKey/${EnumOperandType[o.EnumOperandType]}`);
      operandTypeRef = (response.data as IOperandType).Guid;
    }
    const def: {
        Guid?: string;
        Precedence?: number;
        Key?: string;
        OperandTypeRef?: string;
        IsGrouping?: boolean;
        OperandDirection?: string;
        ThereIsLeftParameter?: boolean;
        ThereIsRightParameter?: boolean;
        Description?: string;
        OperandRegexStr?: string;
        OperandParRegexStr?: string;
      } = {
        Guid: uuid.v1(),
        Precedence: o.Precedence,
        Key: o.Key,
        OperandTypeRef: operandTypeRef,
        IsGrouping: o.IsGrouping,
        OperandDirection: o.Direction === EnumOperandDirection.LeftToRight ? "LR" : "RL",
        ThereIsLeftParameter: o.ThereIsLeftParameter,
        ThereIsRightParameter: o.ThereIsRighParameter,
        Description: o.Description,
        OperandRegexStr: o.OperandRegexStr,
        OperandParRegexStr: o.OperandParRegexStr,
      };
    return def;
  }));

  await axios.post("http://localhost:8080/OperandDefinitions", datas);
}
