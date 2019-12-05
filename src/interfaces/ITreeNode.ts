import { IOperandDefinition } from "./IOperandDefinition";
export interface ITreeNode {
    Data: any;
    Operand?: IOperandDefinition;
    LeftData?: any;
    RightData?: any;
}
