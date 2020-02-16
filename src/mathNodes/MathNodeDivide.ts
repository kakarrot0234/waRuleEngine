import { MathNode } from "../Helpers/MathNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";

export class MathNodeDivide extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      IsParameterCountFixed: false,
    });
  }

  IsValid (): IIsValidResult {
    if (this.OperandParameters == null || this.OperandParameters.length < 2) {
      return { IsValid: false, Message: "There must be at least 2 parameter.", };
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

        let result: number | undefined;

        await this.OperandParameters[0].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[0]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[0]);
        this.ValidateTypeOfResultDataIsNumber(this.OperandParameters[0]);
        await this.OperandParameters[1].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[1]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[1]);
        this.ValidateTypeOfResultDataIsNumber(this.OperandParameters[1]);

        if (this.OperandParameters[1].ResultData === 0) {
          throw new Error(`Result data of the Node that its id number is '${this.OperandParameters[1].Id}' is 0. The divider connot be 0.!`);
        }

        result = this.OperandParameters[0].ResultData / this.OperandParameters[1].ResultData;

        for (let index = 2; index < this.OperandParameters.length; index++) {
          const nodeParameter = this.OperandParameters[index];
          await nodeParameter.FindResultData!();
          this.ValidateFindingResultIsSuccess(nodeParameter);
          this.ValidatePrecenceOfResultData(nodeParameter);
          this.ValidateTypeOfResultDataIsNumber(nodeParameter);

          if (nodeParameter.ResultData === 0) {
            throw new Error(`Result data of the Node that its id number is '${nodeParameter.Id}' is 0. The divider connot be 0.!`);
          }

          result = result / nodeParameter.ResultData;
        }

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

}
