import * as React from 'react';
import { OperandPlus } from '../operands/OperandPlus';
import { useState } from 'react';
import { OperandData } from '../operands/OperandData';

export function About() {
    const [sonuc, setSonuc] = useState<number>(0);


    const onClickHandle = () => {
        try {
            const operand1 = new OperandPlus();
            const operand2 = new OperandData<number>(5);
            const operand3 = new OperandData<number>(4);
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