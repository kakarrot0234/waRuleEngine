import { IRuleOperand } from "../interfaces/IRuleOperand";
import { EnumRuleOperand } from "../enums/EnumRuleOperand";

export class OperandNotEqual implements IRuleOperand<boolean, boolean | number | Date> {

    private m_OperandParameters: IRuleOperand<boolean, boolean | number | Date>[] = [];
    public get OperandParameters(): IRuleOperand<boolean, boolean | number | Date>[] {
        return this.m_OperandParameters;
    }
    public set OperandParameters(value: IRuleOperand<boolean, boolean | number | Date>[]) {
        this.m_OperandParameters = value;
    }

    GetResult: () => boolean = () => {
        let result: boolean;
        let expectedResult: boolean | number | Date;

        if (this.m_OperandParameters.length > 1) {
            expectedResult = this.m_OperandParameters[0].GetResult();

            for (let index = 1; index < this.OperandParameters.length; index++) {
                const element = this.OperandParameters[index];
                
                if (expectedResult === element.GetResult()) {
                    result = false;
                }
            }

            result = true;
        }
        else {
            throw "Hesap parametreleri hatalı.";
        }

        return result;
    };
}