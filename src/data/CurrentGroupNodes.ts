import { IBinaryTreeNode } from '../interfaces/IBinaryTreeNode';
import { CurrentOperandDefinitions } from './CurrentOperandDefinitions';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';

const currentGroupNodes: IBinaryTreeNode[] = [
    { Id: "K1", Data: "64/«K2»", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Divide), LeftData: 64, RightData: "«K2»" },
    { Id: "K2", Data: "2**«K3»", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Exponentiation), LeftData: 2, RightData: "«K3»", IsCustomNode: false },
    { Id: "K3", Data: "1+«K4»", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Plus), LeftData: 1, RightData: "«K4»", IsCustomNode: false },
    { Id: "K4", Data: "2+1", Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Plus), LeftData: 2, RightData: "1", IsCustomNode: true },
    { Id: "K5", Data: 4 },
];

export class CurrentGroupNodes {
    static FindCurrentGroupNode(id: string) {
        return currentGroupNodes.find(o => o.Id === id);
    }
}