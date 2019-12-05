import { IRuleOperand } from "../interfaces/IRuleOperand";

type TOperand = IRuleOperand<boolean, boolean | number | Date> | undefined;

export class OperandNotEqual implements IRuleOperand<boolean, boolean | number | Date> {

    private m_OperandParametersLeft: TOperand;
    public get OperandParameterLeft(): TOperand {
        return this.m_OperandParametersLeft;
    }
    public set OperandParameterLeft(value: TOperand) {
        this.m_OperandParametersLeft = value;
    }

    private m_OperandParametersRight: TOperand;
    public get OperandParameterRight(): TOperand {
        return this.m_OperandParametersRight;
    }
    public set OperandParameterRight(value: TOperand) {
        this.m_OperandParametersRight = value;
    }

    IsValid: () => { IsValid: boolean; Message?: string; } = () => {
        if (this.OperandParameterLeft == null || this.OperandParameterRight == null) {
            return { IsValid: false, Message: "There must be 1 parameter for left and right side!" };
        }

        return { IsValid: true };
    };

    GetResult: () => boolean = () => {
        const isValid = this.IsValid();

        if (!isValid.IsValid) {
            throw `To get the results, you should fix the following problems. ${isValid.Message}`
        }

        const leftSideResult = this.OperandParameterLeft!.GetResult();
        const rightSideResult = this.OperandParameterRight!.GetResult();
        const result = leftSideResult !== rightSideResult;
        return result;
    };
}