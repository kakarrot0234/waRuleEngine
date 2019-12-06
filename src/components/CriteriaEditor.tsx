import * as React from "react";
import { IOperandDetail } from "../interfaces/IOperandDetail";
import { MathTreeFormuletor } from "../helpers/MathTreeFormuletor";
import { useState } from 'react';

export interface ICriteriaEditorProps { 
    Operands?: IOperandDetail[];
};

export function CriteriaEditor(props: ICriteriaEditorProps) {
    const [mathText, setMathText] = useState<string>("!«A»+2*3*(4+50/«KB1»)");

    return (
        <div>
            <textarea value={mathText} onChange={(o) => setMathText(o.target.value)}></textarea>
            <button onClick={() => {
                    const rootRuleOperand = MathTreeFormuletor(mathText);
                    console.log(MathTreeFormuletor(mathText));
                    const result = rootRuleOperand!.GetResult();
                    console.log(result);
                }
            }>Build</button>
        </div>
    );
};
