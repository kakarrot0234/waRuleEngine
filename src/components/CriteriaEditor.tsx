import * as React from "react";
import { MathTreeFormuletor } from '../helpers/MathTreeFormuletor';
import { useState } from 'react';
import { EnumRuleNodeResultFoundCd } from "../enums/EnumRuleNodeResultFoundCd";

export interface ICriteriaEditorProps { 
};

export function CriteriaEditor(props: ICriteriaEditorProps) {
    const [mathText, setMathText] = useState<string>("«K1»");

    return (
        <div>
            <textarea value={mathText} onChange={(o) => setMathText(o.target.value)}></textarea>
            <button onClick={async () => {
                    const rootRuleOperand = new MathTreeFormuletor().ConvertFormuleToTree(mathText);
                    console.log(rootRuleOperand);

                    if (rootRuleOperand != null) {
                        await rootRuleOperand.FindResultData();

                        if (rootRuleOperand.ResultFoundCd === EnumRuleNodeResultFoundCd.Found) {
                            console.log(rootRuleOperand.ResultData);
                        } else {
                            console.log(rootRuleOperand.Error);
                        }
                    }
                }
            }>Build</button>
        </div>
    );
};
