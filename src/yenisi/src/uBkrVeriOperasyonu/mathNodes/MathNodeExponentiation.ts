import { MathNode, } from '../MathNode';
import { IMathNodeCreatorProps, } from "../interfaces/IMathNodeCreatorProps";
import { CurrentOperandDefinitionsProvider, } from '../dataProviders/CurrentOperandDefinitionsProvider';
import { IIsValidResult, } from '../interfaces/IIsValidResult';
import { EnumOperandType, } from '../enums/EnumOperandType';

export class MathNodeExponentiation extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      Operand: new CurrentOperandDefinitionsProvider().GetOperandDefinition(undefined, EnumOperandType.Exponentiation),
      IsParameterCountFixed: true,
    });
  }

  IsValid (): IIsValidResult {
    if (this.OperandParameters == null || this.OperandParameters.length !== 2) {
      return { IsValid: false, Message: "There must be 2 parameter.", };
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
        this.ValidateTypeOfResultDataIsNumber(this.OperandParameters[0]);
        const x: number = this.OperandParameters[0].ResultData;

        await this.OperandParameters[1].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[1]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[1]);
        this.ValidateTypeOfResultDataIsNumber(this.OperandParameters[1]);
        const y: number = this.OperandParameters[1].ResultData;
        const result = Math.pow(x, y);

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  };

}
