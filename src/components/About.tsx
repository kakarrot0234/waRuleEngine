import * as React from 'react';
import { RuleNodePlus } from '../operands/RuleNodePlus';
import { useState } from 'react';
import { RuleNodeData } from '../operands/RuleNodeData';

export function About() {
    const [sonuc, setSonuc] = useState<number>(0);


    const onClickHandle = () => {
        try {
            const operand1 = new RuleNodePlus();
            const operand2 = new RuleNodeData<number>(5);
            const operand3 = new RuleNodeData<number>(4);
            operand1.OperandParameterLeft = operand2;
            operand1.OperandParameterRight = operand3;

            setSonuc(operand1.GetResult());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button onClick={() => onClickHandle()}>Tıkla</button>
            <label>{sonuc}</label>
        </div>
    )
}