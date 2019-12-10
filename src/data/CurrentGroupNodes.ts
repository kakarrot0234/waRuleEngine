import { IBinaryTreeNode } from '../interfaces/IBinaryTreeNode';
import { CurrentOperandDefinitions } from './CurrentOperandDefinitions';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';

const currentGroupNodes: IBinaryTreeNode[] = [
    { Id: "KB1", Data: "2*5", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Multiply), LeftData: 2, RightData: 5 },
    { Id: "A", Data: true, },
];

export class CurrentGroupNodes {
    static FindCurrentGroupNode(id: string) {
        return currentGroupNodes.find(o => o.Id === id);
    }
}