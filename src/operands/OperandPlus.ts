import { IRuleOperand } from "../interfaces/IRuleOperand";

export class OperandPlus implements IRuleOperand<number, number> {

    private m_OperandParameters: IRuleOperand<number, number>[] = [];
    public get OperandParameters(): IRuleOperand<number, number>[] {
        return this.m_OperandParameters;
    }
    public set OperandParameters(value: IRuleOperand<number, number>[]) {
        this.m_OperandParameters = value;
    }

    GetResult: () => number = () => {
        let result = 0;

        if (this.m_OperandParameters.length > 0) {
            this.m_OperandParameters.forEach(element => {
                result += element.GetResult();
            });
        }
        else {
            throw "Hesap parametreleri hatalı.";
        }

        return result;
    };
}