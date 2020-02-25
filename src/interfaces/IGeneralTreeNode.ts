import { IOperandDefinition } from "./IOperandDefinition";

export interface IGeneralTree {
    Id: string;
    IsGrouping?: boolean;
    IsCustomNode?: boolean;
    Data: any;
    Operand?: IOperandDefinition;
    ParDatas?: any[];
    Description?: string;
}