const operandPrecedences = [
    { Precedence: 1, Key: "()", },
    { Precedence: 2, Key: "!", },
    { Precedence: 3, Key: "**", },
    { Precedence: 4, Key: "*", },
    { Precedence: 4, Key: "/", },
    { Precedence: 4, Key: "%", },
    { Precedence: 5, Key: "+", },
    { Precedence: 5, Key: "-", },
    { Precedence: 6, Key: "<", },
    { Precedence: 6, Key: "<=", },
    { Precedence: 6, Key: ">", },
    { Precedence: 6, Key: ">=", },
    { Precedence: 7, Key: "==", },
    { Precedence: 7, Key: "!=", },
    { Precedence: 7, Key: "===", },
    { Precedence: 7, Key: "!==", },
    { Precedence: 8, Key: "&", },
    { Precedence: 9, Key: "^", },
    { Precedence: 10, Key: "=", },
    { Precedence: 10, Key: "+=", },
    { Precedence: 10, Key: "-=", },
    { Precedence: 10, Key: "**=", },
    { Precedence: 10, Key: "*=", },
    { Precedence: 10, Key: "/=", },
    { Precedence: 10, Key: "%=", },
    { Precedence: 10, Key: "&=", },
    { Precedence: 10, Key: "^=", },
    { Precedence: 10, Key: "|=", },
]

export function MathTreeFormuletor(expression: string) {
    let tempId = 1;
    let wrappedSearchResult: { [key: number]: string } = {};
    searchForGroup(expression);

    function searchForGroup(expression: string) {
        const regex = /\(([^()]*)\)/gu;
        let expresstionLast = expression;
        let regexResult = regex.exec(expresstionLast);
    
        while (regexResult) {
            wrappedSearchResult[tempId++] = regexResult[1];
            expresstionLast = expresstionLast.replace(regex, `${String.fromCharCode(171)}${tempId}${String.fromCharCode(187)}`);
            regexResult = regex.exec(expresstionLast);
        }

        console.log(expresstionLast);
        console.log(wrappedSearchResult);
        
    }

}
