import { ITreeNode } from '../interfaces/ITreeNode';
import { OperandDefinitions } from './OperandDefinitions';

export const CurrentGroupNodes: { Id: string, Node: ITreeNode }[] = [
    { Id: "KB1", Node: { Data: "2*5", Operand: OperandDefinitions.find((o) => o.Key === "*"), LeftData: 2, RightData: 5 }, },
    { Id: "A", Node: { Data: true, }, },
];
