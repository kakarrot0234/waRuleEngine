import { IOperandDefinition } from "../interfaces/IOperandDefinition";
import { ITreeNode } from "../interfaces/ITreeNode";
import { OperandDefinitions } from '../data/OperandDefinitions';
import { CurrentGroupNodes } from '../data/CurrentGroupNodes';
import { IRuleOperand } from "../interfaces/IRuleOperand";
import { OperandPlus } from "../operands/OperandPlus";
import { OperandData } from "../operands/OperandData";
import { OperandMultiply } from "../operands/OperandMultiply";
import { OperandDivide } from "../operands/OperandDivide";
import { OperandNot } from '../operands/OperandNot';
import { OperandBiggerThan } from '../operands/OperandBiggerThan';
import { OperandEqualOrBiggerThan } from '../operands/OperandEqualOrBiggerThan';
import { OperandSmallerThan } from '../operands/OperandSmallerThan';
import { OperandEqualOrSmallerThan } from '../operands/OperandEqualOrSmallerThan';
import { OperandMinus } from '../operands/OperandMinus';
import { OperandEqual } from '../operands/OperandEqual';
import { OperandNotEqual } from '../operands/OperandNotEqual';

export function MathTreeFormuletor(expression: string) {
    let tempId = 1;
    let wrappedSearchResult: { Id: string, Node: ITreeNode, IsGrouping?: boolean }[] = [];
    const operandsToLookFor = findOperandsToLookFor(expression);
    createTree(expression);
    return convertTreeToRuleOperands();

    function findOperandsToLookFor(expression: string) {
        const operandsToLookFor: string[] = [];
        let regexOperandsStr = "";

        for (let ii = 0; ii < OperandDefinitions.length; ii++) {
            const operand = OperandDefinitions[ii];
            let operanWithEscapes = "";

            if (operand.IsGrouping) {
                operanWithEscapes += escape(operand.Key.substring(0, 1));
            } else {
                for (let jj = 0; jj < operand.Key.length; jj++) {
                    const element = operand.Key[jj];
                    operanWithEscapes += escape(element);
                }
            }

            if (ii === OperandDefinitions.length - 1) {
                regexOperandsStr += operanWithEscapes
            } else {
                regexOperandsStr += `${operanWithEscapes}|`;
            }
        }

        const regexOperands = new RegExp(regexOperandsStr, "gu");
        let regexOperandsResult = regexOperands.exec(expression);
        while (regexOperandsResult) {
            operandsToLookFor.push(regexOperandsResult[0]);
            regexOperandsResult = regexOperands.exec(expression);
        }

        return operandsToLookFor;
    }
    function createTree(expression: string) {
        let expressionLast = expression;
        const orderedOperands = OperandDefinitions.filter((o) => {
            return operandsToLookFor.indexOf(o.Key) >= 0 || o.IsGrouping && operandsToLookFor.indexOf(o.Key.substring(0, 1)) >= 0;
        }).sort((a, b) => {
            return a.Precedence - b.Precedence;
        });

        if (operandsToLookFor.length > 0) {
            orderedOperands.forEach(operandToLookFor => {
                let success: boolean;

                do {
                    [success, expressionLast] = findTreeNode(operandToLookFor, expressionLast);
                } while (success);
            });
        } else {
            initializeGroupExpressions(expressionLast);
        }
    }
    function findTreeNode(operand: IOperandDefinition, expression: string): [boolean, string] {
        let expressionLast = expression;
        let success = false;

        if (operand.IsGrouping) {
            [success, expressionLast] = searchForGroup(operand, expressionLast);
        } else {
            if (operand.ThereIsLeftParameter && operand.ThereIsRighParameter) {
                const regexStr = `(«?\\w+(?:\\[.*?\\])?»?)${escape(operand.Key)}(«?\\w+(?:\\[.*?\\])?»?)`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    const nodeId = createNodeId();
                    wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[0], Operand: operand, LeftData: regexResult[1], RightData: regexResult[2] } });
                    initializeGroupExpressions(regexResult[1]);
                    initializeGroupExpressions(regexResult[2]);
                    expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                    success = true;
                }
            } else if (operand.ThereIsLeftParameter) {
                const regexStr = `(«?\\w+(?:\\[.*?\\])?»?)${escape(operand.Key)}`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    const nodeId = createNodeId();
                    wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[0], Operand: operand, LeftData: regexResult[1] } });
                    initializeGroupExpressions(regexResult[1]);
                    expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                    success = true;
                }
            }
            else if (operand.ThereIsRighParameter) {
                const regexStr = `${escape(operand.Key)}(«?\\w+(?:\\[.*?\\])?»?)`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    const nodeId = createNodeId();
                    wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[0], Operand: operand, RightData: regexResult[1] } });
                    initializeGroupExpressions(regexResult[1]);
                    expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
                    success = true;
                }
            }
        }

        return [success, expressionLast,];
    }
    function searchForGroup(operand: IOperandDefinition, expression: string): [boolean, string] {
        const regex = new RegExp(`${escape(operand.Key.substring(0, 1))}([^${operand.Key}]*)${escape(operand.Key.substring(1, 2))}`, "gu");
        let expressionLast = expression;
        let regexResult = regex.exec(expressionLast);

        while (regexResult) {
            const nodeId = createNodeId();
            wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[1] }, IsGrouping: true, });
            expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
            regexResult = regex.exec(expressionLast);
        }

        return [expression !== expressionLast, expressionLast];
    }
    function createNodeId() {
        return tempId++;
    }
    function escape(s: string) {
        return s.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function initializeGroupExpressions(expression: string) {
        const regex = /^«(.*?)»$/gu;
        let regexResult = regex.exec(expression);

        while (regexResult) {
            const node = getNodeDescription(regexResult[1]);

            if (node != null && node.Node != null) {
                if (wrappedSearchResult.length > 0) {
                    const lastItem = wrappedSearchResult.pop();
                    wrappedSearchResult.push({ Id: regexResult[1], Node: node.Node }, lastItem!);

                } else {
                    wrappedSearchResult.push({ Id: regexResult[1], Node: node.Node });
                }

            }

            regexResult = regex.exec(expression);
        }

        function getNodeDescription(id: string): { Id: string, Node: ITreeNode } | undefined {
            return CurrentGroupNodes.find((o) => o.Id === id);
        }
    }
    function convertTreeToRuleOperands() {
        const ruleOperand = convertTreeNodeToRuleOperand(wrappedSearchResult[wrappedSearchResult.length - 1].Node);
        return ruleOperand;
    }
    function convertTreeNodeToRuleOperand(node: ITreeNode) {
        let ruleOperand: IRuleOperand<any, any> | undefined;

        if (node.Operand) {
            ruleOperand = createRuleOperand(node.Operand);
        }
        else {
            ruleOperand = createRuleOperandData(node.Data);
        }

        if (node.LeftData && ruleOperand) {
            ruleOperand.OperandParameterLeft = createRuleOperandData(node.LeftData);
        }
        if (node.RightData && ruleOperand) {
            ruleOperand.OperandParameterRight = createRuleOperandData(node.RightData);
        }

        return ruleOperand;
    }
    function createRuleOperand(operandDefinition: IOperandDefinition) {
        switch (operandDefinition.Key) {
            case ">":
                return new OperandBiggerThan();
            case ">=":
                return new OperandEqualOrBiggerThan();
            case "<":
                return new OperandSmallerThan();
            case "<=":
                return new OperandEqualOrSmallerThan();
            case "!":
                return new OperandNot();
            case "==":
                return new OperandEqual();
            case "!=":
                return new OperandNotEqual();
            case "*":
                return new OperandMultiply();
            case "/":
                return new OperandDivide();
            case "+":
                return new OperandPlus();
            case "-":
                return new OperandMinus();
            default:
                break;
        }
    }
    function createRuleOperandData(data: any) {
        const typeofData = typeof data;

        if (typeofData === "string") {
            const regex = /«(\w+)»/gu;
            let regexResult = regex.exec(data);

            if (regexResult) {
                const groupNode = wrappedSearchResult.find((o) => o.Id === regexResult![1]);

                if (groupNode != null && groupNode.IsGrouping) {
                    return MathTreeFormuletor(groupNode!.Node.Data);
                }

                return convertTreeNodeToRuleOperand(groupNode!.Node);
            }
        }

        return new OperandData<typeof data>(data);
    }
}
