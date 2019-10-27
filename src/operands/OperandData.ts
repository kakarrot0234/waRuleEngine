import { IRuleOperand } from "../interfaces/IRuleOperand";

export class OperandData implements IRuleOperand<boolean | Date | number, undefined> {
    constructor(data: boolean) {
        this.m_Data = data;
    }

    private m_Data: boolean | Date | number;

    private m_OperandParameters: IRuleOperand<boolean | Date | number, undefined>[] = [];
    public get OperandParameters(): IRuleOperand<boolean | Date | number, undefined>[] {
        return this.m_OperandParameters;
    }
    public set OperandParameters(value: IRuleOperand<boolean | Date | number, undefined>[]) {
        this.m_OperandParameters = value;
    }

    GetResult: () => boolean | Date | number = () => {
        return this.m_Data;
    };
}