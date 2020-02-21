import { EnumMathNodeType, } from "./enums/EnumMathNodeType";
import { GuidProvider, } from './dataProviders/GuidProvider';
import { IMathNode, } from "./interfaces/IMathNode";
import { IMathNodeCreatorProps, } from "./interfaces/IMathNodeCreatorProps";
import { MathNodeData, } from "./mathNodes/MathNodeData";
import { MathNodeDivide, } from './mathNodes/MathNodeDivide';
import { MathNodeExponentiation, } from './mathNodes/MathNodeExponentiation';
import { MathNodeIn, } from './mathNodes/MathNodeIn';
import { MathNodeLogicalAnd, } from './mathNodes/MathNodeLogicalAnd';
import { MathNodeLogicalNot, } from './mathNodes/MathNodeLogicalNot';
import { MathNodeLogicalOr, } from './mathNodes/MathNodeLogicalOr';
import { MathNodeMinus, } from "./mathNodes/MathNodeMinus";
import { MathNodeMultiply, } from "./mathNodes/MathNodeMultiply";
import { MathNodeNotIn, } from './mathNodes/MathNodeNotIn';
import { MathNodePlus, } from "./mathNodes/MathNodePlus";
import { MathNodeRemainder, } from './mathNodes/MathNodeRemainder';
import { IdProvider, } from './dataProviders/IdProvider';
import { EnumOperandType, } from './enums/EnumOperandType';
import { CurrentOperandDefinitionsProvider, } from "./dataProviders/CurrentOperandDefinitionsProvider";
import { MathNodeStrictEqual, } from './mathNodes/MathNodeStrictEqual';
import { MathNodeStrictNotEqual, } from './mathNodes/MathNodeStrictNotEqual';

export class MathNodeOptions {

  static async CreateMathNode (props: Partial<IMathNodeCreatorProps>): Promise<IMathNode | undefined> {
    if (props.Guid == null) {
      props.Guid = GuidProvider.GetGuid();
    }
    if (props.FollowId == null) {
      props.FollowId = await IdProvider.GetNewMathNodeId();
    }

    if (props.EnumMathNodeType === EnumMathNodeType.Operand) {
      if (props.EnumOperandType != null) {
        switch (props.EnumOperandType) {
        case EnumOperandType.Plus:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.Plus);
          return new MathNodePlus(props);
        case EnumOperandType.Minus:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.Minus);
          return new MathNodeMinus(props);
        case EnumOperandType.Multiply:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.Multiply);
          return new MathNodeMultiply(props);
        case EnumOperandType.LogicalAnd:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.LogicalAnd);
          return new MathNodeLogicalAnd(props);
        case EnumOperandType.LogicalOr:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.LogicalOr);
          return new MathNodeLogicalOr(props);
        case EnumOperandType.LogicalNot:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.LogicalNot);
          return new MathNodeLogicalNot(props);
        case EnumOperandType.Divide:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.Divide);
          return new MathNodeDivide(props);
        case EnumOperandType.Exponentiation:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.Exponentiation);
          return new MathNodeExponentiation(props);
        case EnumOperandType.Remainder:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.Remainder);
          return new MathNodeRemainder(props);
        case EnumOperandType.In:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.In);
          return new MathNodeIn(props);
        case EnumOperandType.NotIn:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.NotIn);
          return new MathNodeNotIn(props);
        case EnumOperandType.StrictEqual:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.StrictEqual);
          return new MathNodeStrictEqual(props);
        case EnumOperandType.StrictNotEqual:
          props.Operand = await MathNodeOptions.findOperandDefinition(EnumOperandType.StrictNotEqual);
          return new MathNodeStrictNotEqual(props);
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
  private static async findOperandDefinition (enumOperandType: EnumOperandType) {
    const operandDef = await new CurrentOperandDefinitionsProvider().GetOperandDefinition(undefined, enumOperandType);
    return operandDef;
  }

};
