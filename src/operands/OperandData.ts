import { IRuleOperand } from "../interfaces/IRuleOperand";

export class OperandData<T> implements IRuleOperand<T, T> {
    constructor(data: T) {
        this.m_Data = data;
    }

    private m_Data: T;
    public get Data(): T {
        return this.m_Data;
    }

    IsValid: () => { IsValid: boolean; Message?: string; } = () => {
        return { IsValid: true };
    };

    GetResult: () => T = () => {
        const isValid = this.IsValid();

        if (!isValid.IsValid) {
            throw `To get the results, you should fix the following problems. ${isValid.Message}`
        }

        return this.Data;
    };
}