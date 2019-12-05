import * as React from "react";
import { IOperandDetail } from "../interfaces/IOperandDetail";
import { MathTreeFormuletor } from "./MathTreeFormuletor";
import { useState } from 'react';

export interface ICriteriaEditorProps { 
    Operands?: IOperandDetail[];
};

export function CriteriaEditor(props: ICriteriaEditorProps) {
    const [mathText, setMathText] = useState<string>("!A+B*C*D");

    return (
        <div>
            <textarea value={mathText} onChange={(o) => setMathText(o.target.value)}></textarea>
            <button onClick={() => MathTreeFormuletor(mathText)}>Build</button>
        </div>
    );
};
