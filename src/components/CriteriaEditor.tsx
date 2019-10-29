import * as React from "react";
import { IOperandDetail } from "../interfaces/IOperandDetail";
import { EnumRuleOperand } from "../enums/EnumRuleOperand";
import { OperandPlus } from "../operands/OperandPlus";
import { IRuleOperand, } from "../interfaces/IRuleOperand";
import  "../extensions/extensions";

export interface ICriteriaEditorProps { 
    Operands?: IOperandDetail[];
};

export function CriteriaEditor(props: ICriteriaEditorProps) {
    const editor = React.useRef<HTMLTextAreaElement>(null);
    const trace: any[] = [];
    
    const onKeyPressHandle = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isInputAnOperand(event.key)) {
            const k: IRuleOperand<number, number>;
            k.
        }
    }
    const onChangeHandle = () => {

    }

    const isInputAnOperand = (newChar: string) => {
        let result = false;

        if (props.Operands) {
            result = props.Operands!.filter(o => o.OperandKey === newChar).length > 0;
        }
        
        return result;
    }
    

    return (
        <div>
            <textarea ref={editor} onKeyPress={onKeyPressHandle} onChange={onChangeHandle}></textarea>
        </div>
    )
};
