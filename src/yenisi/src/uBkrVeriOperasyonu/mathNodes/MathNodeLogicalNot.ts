import { MathNode, } from '../MathNode';
import { IMathNodeCreatorProps, } from "../interfaces/IMathNodeCreatorProps";
import { IIsValidResult, } from '../interfaces/IIsValidResult';

export class MathNodeLogicalNot extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      IsParameterCountFixed: true,
    });
  }

  IsValid (): IIsValidResult {
    if (this.OperandParameters == null || this.OperandParameters.length !== 1) {
      return { IsValid: false, Message: "There must be 1 parameter.", };
    }

    return { IsValid: true, };
  };
  SelfFindResultData (): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const isValid = this.IsValid();

        if (!isValid.IsValid) {
          throw new Error(`To get the results, you should fix the following problems. ${isValid.Message}`);
        }

        await this.OperandParameters[0].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[0]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[0]);
        this.ValidateTypeOfResultDataIsBoolean(this.OperandParameters[0]);
        const result = !this.OperandParameters[0].ResultData;
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  };

}
