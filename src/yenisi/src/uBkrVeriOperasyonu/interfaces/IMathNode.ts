import { EnumMathNodeResultFoundCd, } from "../enums/EnumMathNodeResultFoundCd";
import { IOperandDefinition, } from './IOperandDefinition';
import { IIsValidResult, } from './IIsValidResult';
import { EnumMathNodeType, } from "../enums/EnumMathNodeType";

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
}
