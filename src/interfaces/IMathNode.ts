import { EnumMathNodeResultFoundCd } from "../enums/EnumMathNodeResultFoundCd";
import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { IIsValidResult } from "./IIsValidResult";
import { IOperandDefinition } from "./IOperandDefinition";

export interface IMathNode {
    Guid?: string;
    Id?: string;
    EnumMathNodeType?: EnumMathNodeType;
    ResultFoundCd?: EnumMathNodeResultFoundCd;
    ResultData?: any;
    ResultError?: any;
    Operand?: IOperandDefinition;
    OperandParameters?: IMathNode[];
    ParentNode?: IMathNode;
    IsParameterCountFixed?: boolean;
    IsCustomNode?: boolean;
    IsValid?(): IIsValidResult;
    FindResultData?(): Promise<void>;
    Description?: string;
    ComplexMathExpression?: string;
    SimpleMathExpression?: string;
}
