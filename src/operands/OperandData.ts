import { IRuleOperand } from "../interfaces/IRuleOperand";

export class OperandData implements IRuleOperand<boolean | Date | number, undefined> {
    constructor(data: boolean) {
        this.m_Data = data;
    }

    private m_Data: boolean | Date | number;
    public get Data(): boolean | Date | number {
        return this.m_Data;
    }

    IsValid: () => { IsValid: boolean; Message?: string; } = () => {
        return { IsValid: true };
    };

    GetResult: () => boolean | Date | number = () => {
        const isValid = this.IsValid();

        if (!isValid.IsValid) {
            throw `To get the results, you should fix the following problems. ${isValid.Message}`
        }

        return this.Data;
    };
}