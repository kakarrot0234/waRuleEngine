import Operand from './Operand';
enum OperandDirection {
    LeftToRight,
    RightToLeft,
};

interface IOperandDefinition {
    Precedence: number;
    Key: string;
    IsGrouping?: boolean;
    Direction?: OperandDirection;
    ThereIsLeftParameter: boolean;
    ThereIsRighParameter: boolean;
}

const operandPrecedences: IOperandDefinition[] = [
    { Precedence: 1, Key: "()", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, IsGrouping: true, },
    { Precedence: 2, Key: "!", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: false, ThereIsRighParameter: true, },
    { Precedence: 3, Key: "**", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 4, Key: "*", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 4, Key: "/", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 4, Key: "%", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 5, Key: "+", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 5, Key: "-", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: "<", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: "<=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: ">", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 6, Key: ">=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "==", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "!=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "===", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 7, Key: "!==", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 8, Key: "&", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 9, Key: "^", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "+=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "-=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "**=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "*=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "/=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "%=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "&=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
    { Precedence: 10, Key: "^=", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, }
];

export interface ITreeNode {
    Data: string;
    Operand?: IOperandDefinition;
    LeftData?: string;
    RightData?: string;
}

export function MathTreeFormuletor(expression: string) {
    let tempId = 1;
    let wrappedSearchResult: { Id: string, Node: ITreeNode }[] = [];
    const operandsToLookFor = findOperandsToLookFor(expression);
    createTree(expression);
    console.log(wrappedSearchResult);

    function searchForGroup(operand: IOperandDefinition, expression: string): [ boolean, string ] {
        const regex = new RegExp(`${escape(operand.Key.substring(0, 1))}([^${operand.Key}]*)${escape(operand.Key.substring(1, 2))}`, "gu");
        let expressionLast = expression;
        let regexResult = regex.exec(expressionLast);

        while (regexResult) {
            const nodeId = createNodeId();
            wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[1] } });
            expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${nodeId}${String.fromCharCode(187)}`);
            regexResult = regex.exec(expressionLast);
        }

        return [ expression !== expressionLast, expressionLast ];
    }
    function createNodeId() {
        return tempId++;
    }
    function escape(s: string) {
        return s.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    function createTree(expression: string) {
        let expressionLast = expression;
        const orderedOperands = operandPrecedences.filter((o) => {
            return operandsToLookFor.indexOf(o.Key) >= 0 || o.IsGrouping && operandsToLookFor.indexOf(o.Key.substring(0, 1)) >= 0;
        }).sort((a, b) => {
            return a.Precedence - b.Precedence;
        });
        orderedOperands.forEach(operandToLookFor => {
            let success: boolean;

            do {
                [ success, expressionLast ] = findTreeNode(operandToLookFor, expressionLast);
            } while (success);
        });
    }
    function findTreeNode(operand: IOperandDefinition, expression: string): [ boolean , string ] {
        let expressionLast = expression;
        let success = false;

        if (operand.IsGrouping) {
            [ success, expressionLast ] = searchForGroup(operand, expressionLast);
        } else {
            if (operand.ThereIsLeftParameter && operand.ThereIsRighParameter) {
                const regexStr = `(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)${escape(operand.Key)}(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    const nodeId = createNodeId();
                    wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[0], Operand: operand, LeftData: regexResult[1], RightData: regexResult[2] } });
                    expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${nodeId}${String.fromCharCode(187)}`);
                    success = true;
                }
            } else if (operand.ThereIsLeftParameter) {
                const regexStr = `(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)${escape(operand.Key)}`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    const nodeId = createNodeId();
                    wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[0], Operand: operand, LeftData: regexResult[1] } });
                    expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${nodeId}${String.fromCharCode(187)}`);
                    success = true;
                }
            }
            else if (operand.ThereIsRighParameter) {
                const regexStr = `${escape(operand.Key)}(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    const nodeId = createNodeId();
                    wrappedSearchResult.push({ Id: nodeId.toString(), Node: { Data: regexResult[0], Operand: operand, RightData: regexResult[1] } });
                    expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${nodeId}${String.fromCharCode(187)}`);
                    success = true;
                }
            }
        }

        return [ success, expressionLast, ];
    }
    function findOperandsToLookFor(expression: string) {
        const operandsToLookFor: string[] = [];
        let regexOperandsStr = "";
        
        for (let ii = 0; ii < operandPrecedences.length; ii++) {
            const operand = operandPrecedences[ii];
            let operanWithEscapes = "";

            if (operand.IsGrouping) {
                operanWithEscapes += escape(operand.Key.substring(0, 1));
            } else {
                for (let jj = 0; jj < operand.Key.length; jj++) {
                    const element = operand.Key[jj];
                    operanWithEscapes += escape(element);
                }
            }

            if (ii === operandPrecedences.length - 1) {
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

}
