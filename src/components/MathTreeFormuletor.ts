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

export interface ITree {
    Data: any;
    LeftData: any;
    RightData: any;
}

export function MathTreeFormuletor(expression: string) {
    let tempId = 1;
    let wrappedSearchResult: { [key: number]: string } = {};
    searchForGroup(expression);

    function searchForGroup(expression: string) {
        const regex = /\(([^()]*)\)/gu;
        let expressionLast = expression;
        let regexResult = regex.exec(expressionLast);
    
        while (regexResult) {
            wrappedSearchResult[tempId++] = regexResult[1];
            expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
            regexResult = regex.exec(expressionLast);
        }

        console.log(expressionLast);
        console.log(wrappedSearchResult);
        
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
        const operandsToLookFor: string[] = [];
        while (regexOperandsResult) {
            operandsToLookFor.push(regexOperandsResult[0]);
            regexOperandsResult = regexOperands.exec(expressionLast);
        }

        const orderedOperands = operandPrecedences.filter((o) => {
            return operandsToLookFor.indexOf(o.Key) >= 0;
        }).sort((o) => {
            return o.Precedence;
        });
        orderedOperands.forEach(operandToLookFor => {
            
        });
    }
    function escape (s: string) {
        return s.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    function findTreeNode(operand: IOperandDefinition, expression: string) {
        let node: any;
        let expressionLast = expression;

        if (operand.ThereIsLeftParameter && operand.ThereIsRighParameter) {
            const regexStr = `^(\u{00AB}?\w+?(?:\[.*?\])?)${escape(operand.Key)}(\u{00AB}?\w+?(?:\[.*?\])?\u{00BB}?)`;
            const regex = new RegExp(regexStr, "gu");
            const regexResult = regex.exec(expressionLast);

            if (regexResult) {
                wrappedSearchResult[tempId++] = regexResult[0];
                expressionLast = expressionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
            }
        }
    }

}
