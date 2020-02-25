import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { EnumOperandType } from "../enums/EnumOperandType";
import { ICustomDataService } from "./ICustomDataService";
import { IMathNode } from "./IMathNode";
import { IOperandDefinition } from "./IOperandDefinition";

export interface IMathNodeCreatorProps {
  Guid?: string;
  Id?: string;
  CustomDataService?: ICustomDataService;
  Data?: any;
  Description?: string;
  EnumMathNodeType?: EnumMathNodeType;
  EnumOperandType?: EnumOperandType;
  IsCustomNode?: boolean;
  IsParameterCountFixed?: boolean;
  Operand?: IOperandDefinition;
  ParentNode?: IMathNode;
  ComplexMathExpression?: string;
  SimpleMathExpression?: string;
}
