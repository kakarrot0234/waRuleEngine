import { GuidProvider } from "../dataProviders/GuidProvider";
import { IdProvider } from "../dataProviders/IdProvider";
import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { EnumOperandType } from "../enums/EnumOperandType";
import { IMathNode } from "../interfaces/IMathNode";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";
import { MathNodeData } from "../mathNodes/MathNodeData";
import { MathNodeDivide } from "../mathNodes/MathNodeDivide";
import { MathNodeExponentiation } from "../mathNodes/MathNodeExponentiation";
import { MathNodeIn } from "../mathNodes/MathNodeIn";
import { MathNodeLogicalAnd } from "../mathNodes/MathNodeLogicalAnd";
import { MathNodeLogicalNot } from "../mathNodes/MathNodeLogicalNot";
import { MathNodeLogicalOr } from "../mathNodes/MathNodeLogicalOr";
import { MathNodeMinus } from "../mathNodes/MathNodeMinus";
import { MathNodeMultiply } from "../mathNodes/MathNodeMultiply";
import { MathNodeNotIn } from "../mathNodes/MathNodeNotIn";
import { MathNodePlus } from "../mathNodes/MathNodePlus";
import { MathNodeRemainder } from "../mathNodes/MathNodeRemainder";
import { StringOptions } from "./StringOptions";

export class MathNodeOptions {

  static CreateMathNode (props: Partial<IMathNodeCreatorProps>): IMathNode | undefined {
    if (StringOptions.isNullOrEmpty(props.Guid)) {
      props.Guid = GuidProvider.GetGuid();
    }
    if (StringOptions.isNullOrEmpty(props.Id)) {
      props.Id = IdProvider.GetNewMathNodeId().toString();
    }

    if (props.EnumMathNodeType === EnumMathNodeType.Operand) {
      if (props.EnumOperandType != null) {
        switch (props.EnumOperandType) {
        case EnumOperandType.Plus:
          return new MathNodePlus(props);
        case EnumOperandType.Minus:
          return new MathNodeMinus(props);
        case EnumOperandType.Multiply:
          return new MathNodeMultiply(props);
        case EnumOperandType.LogicalAnd:
          return new MathNodeLogicalAnd(props);
        case EnumOperandType.LogicalOr:
          return new MathNodeLogicalOr(props);
        case EnumOperandType.LogicalNot:
          return new MathNodeLogicalNot(props);
        case EnumOperandType.Divide:
          return new MathNodeDivide(props);
        case EnumOperandType.Exponentiation:
          return new MathNodeExponentiation(props);
        case EnumOperandType.Remainder:
          return new MathNodeRemainder(props);
        case EnumOperandType.In:
          return new MathNodeIn(props);
        case EnumOperandType.NotIn:
          return new MathNodeNotIn(props);
        default:
          return undefined;
        }
      }
    } else if (props.EnumMathNodeType === EnumMathNodeType.Data) {
      if (props.Data != null) {
        props.Data = this.convertDataToAcceptableType(props.Data);
      }
      return new MathNodeData(props);
    }
  };
  static ConvertToList (ruleNode: IMathNode): IMathNode[] {
    const nodes: IMathNode[] = [ ruleNode, ];

    if (ruleNode.OperandParameters != null) {
      ruleNode.OperandParameters.forEach((o) => {
        const childrenNodes = MathNodeOptions.ConvertToList(o);
        childrenNodes.forEach((oo) => {
          nodes.push(oo);
        });
      });
    }

    return nodes;
  }

  private static convertDataToAcceptableType (data: any): any {
    let acceptableData: any = data;
    const typeOfData = typeof data;
    if (typeOfData === "string") {
      const numberData = Number.parseFloat(data);
      if (!Number.isNaN(numberData)) {
        acceptableData = numberData;
      } else {
        if (data === "true" || data === "false") {
          acceptableData = data === "true";
        }
      }
    }
    return acceptableData;
  }

};
