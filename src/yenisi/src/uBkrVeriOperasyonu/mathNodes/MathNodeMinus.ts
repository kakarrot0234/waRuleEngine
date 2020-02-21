import { MathNode, } from "../MathNode";
import { IMathNodeCreatorProps, } from "../interfaces/IMathNodeCreatorProps";
import { IIsValidResult, } from "../interfaces/IIsValidResult";

export class MathNodeMinus extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      IsParameterCountFixed: false,
    });
  }

  IsValid (): IIsValidResult {
    if (this.OperandParameters == null || this.OperandParameters.length < 1) {
      return { IsValid: false, Message: "There must be at least 1 parameter.", };
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

        let result = 0;
        if (this.OperandParameters.length > 1) {
          await this.OperandParameters[0].FindResultData!();
          this.ValidateFindingResultIsSuccess(this.OperandParameters[0]);
          this.ValidatePrecenceOfResultData(this.OperandParameters[0]);
          this.ValidateTypeOfResultDataIsNumber(this.OperandParameters[0]);
          result = this.OperandParameters[0].ResultData;
        }

        for (let index = 1; index < this.OperandParameters.length; index++) {
          const ruleNode = this.OperandParameters[index];
          await ruleNode.FindResultData!();
          this.ValidateFindingResultIsSuccess(ruleNode);
          this.ValidatePrecenceOfResultData(ruleNode);
          this.ValidateTypeOfResultDataIsNumber(ruleNode);
          result -= ruleNode.ResultData;
        }

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  };

}
