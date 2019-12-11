import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
import { RuleNodePlus } from "../ruleNodes/RuleNodePlus";
import { RuleNode } from "./RuleNode";
import { RuleNodeData } from "../ruleNodes/RuleNodeData";
import uuid = require("uuid");
import { RuleNodeMinus } from "../ruleNodes/RuleNodeMinus";
import { StringOptions } from "./StringOptions";
import { RuleNodeMultiply } from "../ruleNodes/RuleNodeMultiply";
import { RuleNodeLogicalNot } from '../ruleNodes/RuleNodeLogicalNot';
import { RuleNodeDivide } from '../ruleNodes/RuleNodeDivide';
import { RuleNodeExponentiation } from '../ruleNodes/RuleNodeExponentiation';
import { RuleNodeLogicalAnd } from '../ruleNodes/RuleNodeLogicalAnd';
import { RuleNodeLogicalOr } from '../ruleNodes/RuleNodeLogicalOr';

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
            case EnumRuleNodeType.LogicalAnd:
                return new RuleNodeLogicalAnd({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.LogicalOr:
                return new RuleNodeLogicalOr({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.LogicalNot:
                return new RuleNodeLogicalNot({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Divide:
                return new RuleNodeDivide({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Exponentiation:
                return new RuleNodeExponentiation({ NodeId: ruleNodeIdTemp });
            case EnumRuleNodeType.Data:
                return new RuleNodeData({ NodeId: ruleNodeIdTemp, Data: data });
            default:
                return undefined;
        }
    };
};