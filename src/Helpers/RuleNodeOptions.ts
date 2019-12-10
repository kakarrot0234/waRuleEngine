import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
import { RuleNodePlus } from "../ruleNodes/RuleNodePlus";
import { RuleNode } from "../interfaces/RuleNode";
import { RuleNodeData } from "../ruleNodes/RuleNodeData";
import uuid = require("uuid");
import { RuleNodeMinus } from "../ruleNodes/RuleNodeMinus";
import { StringOptions } from "./StringOptions";
import { RuleNodeMultiply } from "../ruleNodes/RuleNodeMultiply";
import { RuleNodeNot } from '../ruleNodes/RuleNodeNot';
import { RuleNodeDivide } from '../ruleNodes/RuleNodeDivide';

export class RuleNodeOptions {
    static CreateRuleNode(enumRuleNodeType: EnumRuleNodeType, ruleNodeId?: string, data?: any, parentRuleNode?: RuleNode): RuleNode | undefined {
        let ruleNodeIdTemp: string;

        if (!StringOptions.IsNullOrEmpty(ruleNodeId)) {
            ruleNodeIdTemp = ruleNodeId!;
        } else {
            ruleNodeIdTemp = uuid.v1();
        }

        switch (enumRuleNodeType) {
            case EnumRuleNodeType.Plus:
                return new RuleNodePlus({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Minus:
                return new RuleNodeMinus({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Multiply:
                return new RuleNodeMultiply({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Not:
                return new RuleNodeNot({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Divide:
                return new RuleNodeDivide({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Data:
                return new RuleNodeData({ NodeId: ruleNodeIdTemp, Data: data });
            default:
                return undefined;
        }
    };
};