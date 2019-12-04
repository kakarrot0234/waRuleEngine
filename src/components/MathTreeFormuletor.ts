import Operand from './Operand';
enum OperandDirection {
    LeftToRight,
    RightToLeft,
};

interface IOperandDefinition {
    Precedence: number;
    Key: string;
    Direction: OperandDirection;
    ThereIsLeftParameter: boolean;
    ThereIsRighParameter: boolean;
}

const operandPrecedences: IOperandDefinition[] = [
    { Precedence: 1, Key: "()", Direction: OperandDirection.LeftToRight, ThereIsLeftParameter: true, ThereIsRighParameter: true, },
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
    Data: any;
    Operand?: IOperandDefinition;
    LeftData?: ITreeNode;
    RightData?: ITreeNode;
}

export function MathTreeFormuletor(expression: string) {
    let tempId = 1;
    let wrappedSearchResult: { [key: number]: ITreeNode } = {};
    const operandsToLookFor: string[] = [];
    searchForGroup(expression);
    console.log(wrappedSearchResult);

    function searchForGroup(expression: string) {
        const regex = /\(([^()]*)\)/gu;
        let expressionLast = expression;
        let regexResult = regex.exec(expressionLast);

        while (regexResult) {
            wrappedSearchResult[tempId++] = { Data: regexResult[1] };
            expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
            regexResult = regex.exec(expressionLast);
        }

        let regexOperandsStr = "";
        for (let ii = 0; ii < operandPrecedences.length; ii++) {
            const operand = operandPrecedences[ii];
            let operanWithEscapes = "";

            for (let jj = 0; jj < operand.Key.length; jj++) {
                const element = operand.Key[jj];
                operanWithEscapes += escape(element);
            }

            if (ii === operandPrecedences.length - 1) {
                regexOperandsStr += operanWithEscapes
            } else {
                regexOperandsStr += `${operanWithEscapes}|`;
            }
        }

        const regexOperands = new RegExp(regexOperandsStr, "gu");
        let regexOperandsResult = regexOperands.exec(expressionLast);
        while (regexOperandsResult) {
            operandsToLookFor.push(regexOperandsResult[0]);
            regexOperandsResult = regexOperands.exec(expressionLast);
        }

        createTree(expressionLast);
    }
    function escape(s: string) {
        return s.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    function createTree(expression: string): ITreeNode {
        const rootNode: ITreeNode = { Data: expression };
        let expressionLast = expression;
        const orderedOperands = operandPrecedences.filter((o) => {
            return operandsToLookFor.indexOf(o.Key) >= 0;
        }).sort((o) => {
            return o.Precedence;
        });
        orderedOperands.forEach(operandToLookFor => {
            let success: boolean;

            do {
                [ success, expressionLast ] = findTreeNode(operandToLookFor, expressionLast);
            } while (success);
        });

        if (wrappedSearchResult[tempId - 1]) {
            rootNode.Data = `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`;
        } else {
            rootNode.Data = expressionLast;
        }
        
        wrappedSearchResult[tempId] = rootNode;
        tempId++;
        return rootNode;
    }
    function findTreeNode(operand: IOperandDefinition, expression: string): [ boolean , string ] {
        let expressionLast = expression;
        let success = false;

        if (operand.Direction === OperandDirection.LeftToRight) {
            if (operand.ThereIsLeftParameter && operand.ThereIsRighParameter) {
                const regexStr = `(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)${escape(operand.Key)}(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    wrappedSearchResult[tempId] = { Data: regexResult[0], Operand: operand, };
                    expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
                    tempId++;
                    wrappedSearchResult[tempId - 1].LeftData = createTree(regexResult[1]);
                    wrappedSearchResult[tempId - 1].RightData = createTree(regexResult[2]);
                    success = true;
                }
            } else if (operand.ThereIsLeftParameter) {
                const regexStr = `(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)${escape(operand.Key)}`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    wrappedSearchResult[tempId] = { Data: regexResult[0], Operand: operand, };
                    expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
                    tempId++;
                    wrappedSearchResult[tempId - 1].LeftData = createTree(regexResult[1]);
                    success = true;
                }
            }
            else if (operand.ThereIsRighParameter) {
                const regexStr = `${escape(operand.Key)}(\u{00AB}?\\w+?(?:\\[.*?\\])?\u{00BB}?)`;
                const regex = new RegExp(regexStr, "gu");
                const regexResult = regex.exec(expressionLast);

                if (regexResult) {
                    wrappedSearchResult[tempId] = { Data: regexResult[0], Operand: operand, };
                    expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
                    tempId++;
                    wrappedSearchResult[tempId - 1].RightData = createTree(regexResult[1]);
                    success = true;
                }
            }
        } else {

        }

        return [ success, expressionLast, ];
    }

}
