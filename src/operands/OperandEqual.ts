import { IRuleOperand } from "../interfaces/IRuleOperand";
import { EnumRuleOperand } from "../enums/EnumRuleOperand";

export class OperandEqual implements IRuleOperand<boolean, boolean | number | Date> {
    constructor(data?: boolean) {
        this.m_Result = data;
    }

    private m_Result: boolean | undefined = undefined;

    public get Operand() {
        return EnumRuleOperand.Equal;
    }

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
                
                if (expectedResult !== element.GetResult()) {
                    result = false;
                }
            }

            result = true;
        }
        else {
            if (this.m_Result !== undefined) {
                result = this.m_Result;
            }
            else {
                throw "Hesap parametreleri eksik.";                
            }
        }

        return result;
    };
}