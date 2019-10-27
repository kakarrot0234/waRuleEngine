import { IRuleOperand } from "../interfaces/IRuleOperand";

type TOperand = IRuleOperand<number, number> | undefined;

export class OperandMinus implements IRuleOperand<number, number> {

    private m_OperandParameterLeft: TOperand;
    public get OperandParameterLeft(): TOperand {
        return this.m_OperandParameterLeft;
    }
    public set OperandParameterLeft(value: TOperand) {
        this.m_OperandParameterLeft = value;
    }

    private m_OperandParameterRight: TOperand;
    public get OperandParameterRight(): TOperand {
        return this.m_OperandParameterRight;
    }
    public set OperandParameterRight(value: TOperand) {
        this.m_OperandParameterRight = value;
    }

    IsValid: () => { IsValid: boolean; Message?: string; } = () => {
        if (this.OperandParameterLeft == null || this.OperandParameterRight == null) {
            return { IsValid: false, Message: "There must be 1 parameter for left and right side!" };
        }

        return { IsValid: true };
    };

    GetResult: () => number = () => {
        const isValid = this.IsValid();

        if (!isValid.IsValid) {
            throw `To get the results, you should fix the following problems. ${isValid.Message}`
        }

        const leftSideResult = this.OperandParameterLeft!.GetResult();
        const rightSideResult = this.OperandParameterRight!.GetResult();
        const result = leftSideResult + rightSideResult;
        return result;
    };
}