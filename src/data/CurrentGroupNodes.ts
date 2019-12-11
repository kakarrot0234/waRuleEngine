import { IBinaryTreeNode } from '../interfaces/IBinaryTreeNode';
import { CurrentOperandDefinitions } from './CurrentOperandDefinitions';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';

const currentGroupNodes: IBinaryTreeNode[] = [
    { Id: "K1", Data: "64/«K2»", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Divide), LeftData: 64, RightData: "«K2»" },
    { Id: "K2", Data: "2**«K3»", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Exponentiation), LeftData: 2, RightData: "«K3»" },
    { Id: "K3", Data: 4 },
];

export class CurrentGroupNodes {
    static FindCurrentGroupNode(id: string) {
        return currentGroupNodes.find(o => o.Id === id);
    }
}