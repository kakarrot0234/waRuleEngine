import { IRuleOperand } from "../interfaces/IRuleOperand";
import { EnumRuleOperand } from "../enums/EnumRuleOperand";

export class OperandPlus implements IRuleOperand<number, number> {
    constructor(data?: number) {
        this.m_Result = data;
    }

    private m_Result: number | undefined = undefined;

    public get Operand() {
        return EnumRuleOperand.Plus;
    }

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