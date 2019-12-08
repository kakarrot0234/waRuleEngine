import * as React from 'react';
import { CriteriaEditor } from './CriteriaEditor';
import { IOperandDetail } from '../interfaces/IOperandDetail';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';

export interface IHomeProps { };

export function Home(props: IHomeProps) {
    const operands: IOperandDetail[] = [
        { OperandEnum: EnumRuleNodeType.Plus, OperandKey: "+", OperandName: "Plus"},
        { OperandEnum: EnumRuleNodeType.Minus, OperandKey: "-", OperandName: "Minus"},
        { OperandEnum: EnumRuleNodeType.Multiply, OperandKey: "*", OperandName: "Multiply"},
        { OperandEnum: EnumRuleNodeType.Divide, OperandKey: "/", OperandName: "Divide"},
    ];
    const operandMetinleri = operands.map(o => {
        return (
            <option key={o.OperandKey}>{o.OperandName}</option>
        );
    });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col col-3" style={{ backgroundColor: "red" }}>
                    <select size={6}>{operandMetinleri}</select>
                </div>
                <div className="col col-1" style={{ backgroundColor: "blue" }}>
                    <CriteriaEditor Operands={operands}></CriteriaEditor>
                </div>
            </div>
        </div>
    );
};
