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
    static CreateRuleNode(enumRuleNodeType: EnumRuleNodeType, ruleNodeId?: string, data?: any): RuleNode | undefined {
        let ruleNodeIdTemp: string;

        if (!StringOptions.IsNullOrEmpty(ruleNodeId)) {
            ruleNodeIdTemp = ruleNodeId!;
        } else {
            ruleNodeIdTemp = uuid.v1();
        }

        switch (enumRuleNodeType) {
            case EnumRuleNodeType.Plus:
                return new RuleNodePlus(ruleNodeIdTemp);
            case EnumRuleNodeType.Minus:
                return new RuleNodeMinus(ruleNodeId!);
            case EnumRuleNodeType.Multiply:
                return new RuleNodeMultiply(ruleNodeId!);
            case EnumRuleNodeType.Not:
                return new RuleNodeNot(ruleNodeId!);
            case EnumRuleNodeType.Divide:
                return new RuleNodeDivide(ruleNodeId!);
            case EnumRuleNodeType.Data:
                return new RuleNodeData(ruleNodeIdTemp, data);
            default:
                return undefined;
        }
    };
};