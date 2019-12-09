import { IBinaryTreeNode } from '../interfaces/IBinaryTreeNode';
import { OperandDefinitions } from './OperandDefinitions';

const currentGroupNodes: IBinaryTreeNode[] = [
    { Id: "KB1", Data: "2*5", Operand: OperandDefinitions.find((o) => o.Key === "*"), LeftData: 2, RightData: 5 },
    { Id: "A", Data: true, },
];

export class CurrentGroupNodes {
    static FindCurrentGroupNode(id: string) {
        return currentGroupNodes.find(o => o.Id === id);
    }
}