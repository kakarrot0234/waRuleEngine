import { MathNode, } from "../MathNode";
import { IMathNodeCreatorProps, } from "../interfaces/IMathNodeCreatorProps";
import { IIsValidResult, } from "../interfaces/IIsValidResult";
import { CurrentOperandDefinitionsProvider, } from "../dataProviders/CurrentOperandDefinitionsProvider";
import { EnumOperandType, } from '../enums/EnumOperandType';

export class MathNodeNotEqual extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      Operand: new CurrentOperandDefinitionsProvider().GetOperandDefinition(undefined, EnumOperandType.NotEqual),
      IsParameterCountFixed: false,
    });
  }

  IsValid (): IIsValidResult {
    if (this.OperandParameters == null || this.OperandParameters.length < 2) {
      return { IsValid: false, Message: "There must be at least 2 parameters!", };
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
        const x = this.OperandParameters[0].ResultData;
        let result: boolean;

        for (let index = 0; index < this.OperandParameters.length; index++) {
          const ruleNode = this.OperandParameters[index];
          await ruleNode.FindResultData!();
          this.ValidateFindingResultIsSuccess(ruleNode);
          this.ValidatePrecenceOfResultData(ruleNode);
          const y = ruleNode.ResultData;
          result = x !== y;

          if (!result) {
            break;
          }
        }

        return resolve(result!);
      } catch (error) {
        return reject(error);
      }
    });
  }

}
