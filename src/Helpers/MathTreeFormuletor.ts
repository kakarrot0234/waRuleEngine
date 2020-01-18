import { CurrentGroupNodes } from "../data/CurrentGroupNodes";
import { CurrentOperandDefinitions } from "../data/CurrentOperandDefinitions";
import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
import { IBinaryTreeNode } from "../interfaces/IBinaryTreeNode";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";
import { RuleNode } from "./RuleNode";
import { RuleNodeOptions } from "./RuleNodeOptions";

export class MathTreeFormuletor {
    ConvertFormuleToTree(expression: string, parentRuleNode?: RuleNode): RuleNode | undefined {
        let tempId = 1;
        const wrappedSearchResult: IBinaryTreeNode[] = [];
        const operandsToLookFor = findOperandsToLookFor(expression);
        simplifyFormule(expression);
        const rootBinaryNodeRoot = wrappedSearchResult[wrappedSearchResult.length - 1];
        let ruleNodeRoot: RuleNode | undefined;

        if (rootBinaryNodeRoot != null) {
            ruleNodeRoot = createBinaryTree(rootBinaryNodeRoot, parentRuleNode);
            convertToGeneralTree(ruleNodeRoot!);
        }

        return ruleNodeRoot;

        function findOperandsToLookFor(expression: string) {
            const operandsToLookFor: string[] = [];
            const allOperandDefs = CurrentOperandDefinitions.OperandDefinitions.sort((a, b) => {
                return b.Key.length - a.Key.length;
            });
            allOperandDefs.forEach(operandDef => {
                const regexOperand = new RegExp(operandDef.OperandRegexStr, "gu");
                const regexOperandResult = regexOperand.exec(expression);
                
                if (regexOperandResult != null) {
                    operandsToLookFor.push(operandDef.Key);
                }
            });

            return operandsToLookFor;
        }
        function simplifyFormule(expression: string) {
            let expressionLast = expression;
            const orderedOperands = CurrentOperandDefinitions.OperandDefinitions.filter((o) => {
                return operandsToLookFor.indexOf(o.Key) >= 0;
            }).sort((a, b) => {
                return a.Precedence - b.Precedence;
            });

            if (orderedOperands.length > 0) {
                orderedOperands.forEach(operandToLookFor => {
                    let success: boolean;
    
                    do {
                        [success, expressionLast] = findTreeNode(operandToLookFor, expressionLast);
                    } while (success);
                });
            } else {
                const nodeId = createNodeId();
                wrappedSearchResult.push({ Id: nodeId.toString(), Data: expressionLast });
            }
        }
        function findTreeNode(operand: IOperandDefinition, expression: string): [boolean, string] {
            let expressionLast = expression;
            let success = false;

            if (operand.IsGrouping) {
                [success, expressionLast] = searchForGroup(operand, expressionLast);
            } else {
                const regexStr = operand.OperandParRegexStr;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult != null) {
                    if (operand.ThereIsLeftParameter && operand.ThereIsRighParameter) {
                        const nodeId = createNodeId();
                        wrappedSearchResult.push({ Id: nodeId.toString(), Data: regexResult[0], Operand: operand, LeftData: regexResult[1], RightData: regexResult[2] });
                        expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                        success = true;
                    } else if (operand.ThereIsLeftParameter) {
                        const nodeId = createNodeId();
                        wrappedSearchResult.push({ Id: nodeId.toString(), Data: regexResult[0], Operand: operand, LeftData: regexResult[1] });
                        expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                        success = true;
                    } else if (operand.ThereIsRighParameter) {
                        const nodeId = createNodeId();
                        wrappedSearchResult.push({ Id: nodeId.toString(), Data: regexResult[0], Operand: operand, RightData: regexResult[1] });
                        expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                        success = true;
                    }
                }
            }

            return [success, expressionLast,];
        }
        function searchForGroup(operand: IOperandDefinition, expression: string): [boolean, string] {
            const regex = new RegExp(`${operand.OperandParRegexStr}`, "gu");
            let expressionLast = expression;
            let regexResult = regex.exec(expressionLast);

            while (regexResult) {
                const nodeId = createNodeId();
                wrappedSearchResult.push({ Id: nodeId.toString(), Data: regexResult[1], IsGrouping: true, });
                expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                regexResult = regex.exec(expressionLast);
            }

            return [expression !== expressionLast, expressionLast];
        }
        function createNodeId() {
            return tempId++;
        }
        function createBinaryTree(binaryNode: IBinaryTreeNode, parentRuleNode?: RuleNode): RuleNode | undefined {
            let ruleNode: RuleNode | undefined;
            
            if (binaryNode.IsGrouping != null && binaryNode.IsGrouping) {
                ruleNode = new MathTreeFormuletor().ConvertFormuleToTree(binaryNode.Data);
            } else {
                if (binaryNode.Operand != null) {
                    ruleNode = RuleNodeOptions.CreateRuleNode(binaryNode.Operand.Enum!, undefined, binaryNode.Id, binaryNode.Data, parentRuleNode, binaryNode.IsCustomNode);

                    if (ruleNode != null) {
                        if (binaryNode.LeftData != null) {
                            const leftNode = nodeDataToRuleNode(undefined, binaryNode.LeftData, ruleNode);
                            ruleNode.NodeParameters.push(leftNode!);
                        }
                        if (binaryNode.RightData != null) {
                            const rightNode = nodeDataToRuleNode(undefined, binaryNode.RightData, ruleNode);
                            ruleNode.NodeParameters.push(rightNode!);
                        }
                    }
                } else {
                    ruleNode = nodeDataToRuleNode(binaryNode.Id, binaryNode.Data, parentRuleNode);
                }
            }

            return ruleNode;
        }
        function nodeDataToRuleNode(ruleNodeId: string | undefined, data: any, parentRuleNode?: RuleNode) {
            let ruleNode: RuleNode | undefined;
            const typeofData = typeof data;

            if (typeofData === "string") {
                const regex = /^«(\w+)»$/gu;
                let regexResult = regex.exec(data);

                if (regexResult != null) {
                    let groupNode = wrappedSearchResult.find((o) => o.Id === regexResult![1]);

                    if (groupNode == null) {
                        groupNode = CurrentGroupNodes.FindCurrentGroupNode(regexResult[1]);
                    }

                    if (groupNode != null) {
                        ruleNode = createBinaryTree(groupNode, parentRuleNode);
                        return ruleNode;
                    }
                }
            }

            let tempData: any = Number.parseFloat(data);
            if (Number.isNaN(tempData)) {
                if (data === "true" || data === "false") {
                    tempData = data === "true";
                } else {
                    tempData = data;
                }
            }
            
            ruleNode = RuleNodeOptions.CreateRuleNode(EnumRuleNodeType.Data, undefined, ruleNodeId, tempData, parentRuleNode);
            return ruleNode;
        }
        function convertToGeneralTree(binaryNodeRoot: RuleNode) {
            if (binaryNodeRoot.Operand != null) {
                binaryNodeRoot.NodeParameters = getNodeParametersForGeneralTree(binaryNodeRoot, binaryNodeRoot.Operand!);
            }
        }
        function getNodeParametersForGeneralTree(nodeToGetParameters: RuleNode, parentOperandDef: IOperandDefinition) {
            let newNodeParameters: RuleNode[] = [];

            if (nodeToGetParameters.Operand != null &&
                nodeToGetParameters.Operand.Enum === parentOperandDef.Enum) {
                if (nodeToGetParameters.Operand.Direction === EnumOperandDirection.LeftToRight) {
                    for (let index = 0; index < nodeToGetParameters.NodeParameters.length; index++) {
                        const node = nodeToGetParameters.NodeParameters[index];

                        if (node.IsParameterCountFixed || node.IsCustomRuleNode) {
                            newNodeParameters.push(node);
                        } else {
                            newNodeParameters.push(...getNodeParametersForGeneralTree(node, parentOperandDef));
                        }
                    }
                }
            }

            if (newNodeParameters.length === 0) {
                newNodeParameters.push(nodeToGetParameters);
            }

            return newNodeParameters;
        }
    }
};
