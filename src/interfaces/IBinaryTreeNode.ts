import { IOperandDefinition } from "./IOperandDefinition";
export interface IBinaryTreeNode {
    Id: string;
    IsGrouping?: boolean;
    Data: any;
    Operand?: IOperandDefinition;
    LeftData?: any;
    RightData?: any;
}
