import uuid = require("uuid");

import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
import { RuleNodeData } from "../ruleNodes/RuleNodeData";
import { RuleNodeDivide } from "../ruleNodes/RuleNodeDivide";
import { RuleNodeExponentiation } from "../ruleNodes/RuleNodeExponentiation";
import { RuleNodeIn } from "../ruleNodes/RuleNodeIn";
import { RuleNodeLogicalAnd } from "../ruleNodes/RuleNodeLogicalAnd";
import { RuleNodeLogicalNot } from "../ruleNodes/RuleNodeLogicalNot";
import { RuleNodeLogicalOr } from "../ruleNodes/RuleNodeLogicalOr";
import { RuleNodeMinus } from "../ruleNodes/RuleNodeMinus";
import { RuleNodeMultiply } from "../ruleNodes/RuleNodeMultiply";
import { RuleNodePlus } from "../ruleNodes/RuleNodePlus";
import { RuleNodeRemainder } from "../ruleNodes/RuleNodeRemainder";
import { RuleNode } from "./RuleNode";
import { StringOptions } from "./StringOptions";

export class RuleNodeOptions {
    static CreateRuleNode(enumRuleNodeType: EnumRuleNodeType, ruleNodeId?: string, nodeRef?: string, data?: any, parentRuleNode?: RuleNode, isCustumRuleNode?: boolean): RuleNode | undefined {
        let ruleNodeIdTemp: string;

        if (!StringOptions.IsNullOrEmpty(ruleNodeId)) {
            ruleNodeIdTemp = ruleNodeId!;
        } else {
            ruleNodeIdTemp = uuid.v1();
        }

        switch (enumRuleNodeType) {
            case EnumRuleNodeType.Plus:
                return new RuleNodePlus({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.Minus:
                return new RuleNodeMinus({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.Multiply:
                return new RuleNodeMultiply({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.LogicalAnd:
                return new RuleNodeLogicalAnd({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.LogicalOr:
                return new RuleNodeLogicalOr({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.LogicalNot:
                return new RuleNodeLogicalNot({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.Divide:
                return new RuleNodeDivide({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.Exponentiation:
                return new RuleNodeExponentiation({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.Remainder:
                return new RuleNodeRemainder({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.In:
                return new RuleNodeIn({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode });
            case EnumRuleNodeType.Data:
                return new RuleNodeData({ Id: ruleNodeIdTemp, NodeRef: nodeRef, Parent: parentRuleNode, IsCustomRuleNode: isCustumRuleNode, Data: data });
            default:
                return undefined;
        }
    };
};