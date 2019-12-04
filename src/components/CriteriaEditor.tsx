import * as React from "react";
import { IOperandDetail } from "../interfaces/IOperandDetail";
import { EnumRuleOperand } from "../enums/EnumRuleOperand";
import { OperandPlus } from "../operands/OperandPlus";
import { IRuleOperand, } from "../interfaces/IRuleOperand";
import { OperandOptions } from "../operands/OperandOptions";
import { StringOptions } from "../Helpers/StringOptions";
import { MathTreeFormuletor } from "./MathTreeFormuletor";

export interface ICriteriaEditorProps { 
    Operands?: IOperandDetail[];
};

export function CriteriaEditor(props: ICriteriaEditorProps) {
    const editor = React.useRef<HTMLTextAreaElement>(null);
    const operandTree: IRuleOperand<any, any>[] = [];
    let tempData: string = "";
    
    const onKeyPressHandle = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        
    }    

    return (
        <div>
            <textarea ref={editor} onKeyPress={onKeyPressHandle}></textarea>
            <button onClick={() => MathTreeFormuletor(editor.current!.value)}>Build</button>
        </div>
    );
};
