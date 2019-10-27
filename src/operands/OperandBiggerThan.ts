import { IRuleOperand } from "../interfaces/IRuleOperand";

export class OperandBiggerThan implements IRuleOperand<boolean, Date | number> {
    
    private m_OperandParameters: IRuleOperand<boolean, Date | number>[] = [];
    public get OperandParameters(): IRuleOperand<boolean, Date | number>[] {
        return this.m_OperandParameters;
    }
    public set OperandParameters(value: IRuleOperand<boolean, Date | number>[]) {
        this.m_OperandParameters = value;
    }

    GetResult: () => boolean = () => {
        let result: boolean;

        if (this.m_OperandParameters.length > 1) {
            result = this.m_OperandParameters[0].GetResult() > this.m_OperandParameters[1].GetResult();
        }
        else {
            throw "Hesap parametreleri hatalı.";
        }

        return result;
    };
}