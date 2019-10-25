import * as React from 'react';
import { RulesEditor } from './RulesEditor';
import { OperandPlus } from '../operands/OperandPlus';
import { useState } from 'react';

export function About() {
    const [sonuc, setSonuc] = useState<number>(0);

    const onClickHandle = () => {
        try {
            const operand1 = new OperandPlus();
            const operand2 = new OperandPlus();
            const operand3 = new OperandPlus();
            operand1.OperandParameters = [
                operand2,
                operand3,
            ];

            setSonuc(operand1.GetResult());
        } catch (error) {
            debugger;
            console.log(error);
        }
    }

    return (
        <div>
            <RulesEditor>
                <h1>Hello 1</h1>
                <h1>Hello 2</h1>
            </RulesEditor>
            <button onClick={() => onClickHandle()}>Tıkla</button>
            <label>{sonuc}</label>
        </div>
    )
}