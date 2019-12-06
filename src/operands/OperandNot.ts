import { IRuleOperand } from '../interfaces/IRuleOperand';

export class OperandNot implements IRuleOperand<boolean, boolean> {
    
    private m_OperandParameterRight: IRuleOperand<boolean, boolean> | undefined;
    public get OperandParameterRight(): IRuleOperand<boolean, boolean> | undefined {
        return this.m_OperandParameterRight;
    }
    public set OperandParameterRight(value: IRuleOperand<boolean, boolean> | undefined) {
        this.m_OperandParameterRight = value;
    }

    IsValid: () => { IsValid: boolean; Message?: string; } = () => {
        if (this.OperandParameterRight == null) {
            return { IsValid: false, Message: "There must be 1 parameter for right side!" };
        }

        return { IsValid: true };
    };

    GetResult: () => boolean = () => {
        const isValid = this.IsValid();

        if (!isValid.IsValid) {
            throw `To get the results, you should fix the following problems. ${isValid.Message}`
        }

        const rightSideResult = this.OperandParameterRight!.GetResult();
        const result = !rightSideResult;
        return result;
    };
}