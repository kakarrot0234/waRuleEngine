import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
import { RuleNodePlus } from "./RuleNodePlus";
import { RuleNode } from "../interfaces/RuleNode";
import { RuleNodeData } from "./RuleNodeData";
import uuid = require("uuid");
import { RuleNodeMinus } from "./RuleNodeMinus";
import { StringOptions } from "../Helpers/StringOptions";
import { RuleNodeMultiply } from "./RuleNodeMultiply";

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
            case EnumRuleNodeType.Data:
                return new RuleNodeData(ruleNodeIdTemp, data);
            default:
                return undefined;
        }
    };
};