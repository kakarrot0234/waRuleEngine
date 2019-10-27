import { IRuleOperand } from "../interfaces/IRuleOperand";
import { EnumRuleOperand } from "../enums/EnumRuleOperand";

export class OperandMinus implements IRuleOperand<number, number> {

    private m_OperandParameters: IRuleOperand<number, number>[] = [];
    public get OperandParameters(): IRuleOperand<number, number>[] {
        return this.m_OperandParameters;
    }
    public set OperandParameters(value: IRuleOperand<number, number>[]) {
        this.m_OperandParameters = value;
    }

    GetResult: () => number = () => {
        let result = 0;

        if (this.m_OperandParameters.length > 1) {
            result = this.m_OperandParameters[1].GetResult();
            
            for (let index = 1; index < this.m_OperandParameters.length; index++) {
                const element = this.m_OperandParameters[index];
                result -= element.GetResult();
            }
        }
        else {
            throw "Hesap parametreleri hatalı.";
        }

        return result;
    };
}