import { MathNode } from "../Helpers/MathNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";

export class MathNodePlus extends MathNode {

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

        await this.OperandParameters[0].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[0]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[0]);
        this.ValidateTypeOfResultDataIsAcceptable([ "number", "string", ], this.OperandParameters[0]);
        let result = this.OperandParameters[0].ResultData;

        for (let index = 1; index < this.OperandParameters.length; index++) {
          const ruleNode = this.OperandParameters[index];
          await ruleNode.FindResultData!();
          this.ValidateFindingResultIsSuccess(ruleNode);
          this.ValidatePrecenceOfResultData(ruleNode);
          this.ValidateTypeOfResultDataIsAcceptable([ "number", "string", ], ruleNode);
          result += ruleNode.ResultData;
        }

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  };

}
