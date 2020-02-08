import { CurrentOperandDefinitionsProvider } from "../dataProviders/CurrentOperandDefinitionsProvider";
import { EnumOperandType } from "../enums/EnumOperandType";
import { MathNode } from "../Helpers/MathNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";

export class MathNodeBiggerOrEqualThan extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      Operand: new CurrentOperandDefinitionsProvider().GetOperandDefinition(undefined, EnumOperandType.BiggerOrEqualThan),
      IsParameterCountFixed: true,
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

        await this.OperandParameters[0].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[0]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[0]);
        await this.OperandParameters[1].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[1]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[1]);
        const leftSideResult = this.OperandParameters[0].ResultData;
        const rightSideResult = this.OperandParameters[1].ResultData;
        const result = leftSideResult >= rightSideResult;
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

}
