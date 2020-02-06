import { CurrentOperandDefinitionsProvider, } from "../dataProviders/CurrentOperandDefinitionsProvider";
import { IIsValidResult, } from "../interfaces/IIsValidResult";
import { IMathNodeCreatorProps, } from "../interfaces/IMathNodeCreatorProps";
import { MathNode, } from "../MathNode";
import { EnumOperandType, } from '../enums/EnumOperandType';

export class MathNodeNotIn extends MathNode {

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      Operand: new CurrentOperandDefinitionsProvider().GetOperandDefinition(undefined, EnumOperandType.In),
      IsParameterCountFixed: true,
    });
  }

  IsValid (): IIsValidResult {
    if (this.OperandParameters == null || this.OperandParameters.length < 2) {
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
        await this.OperandParameters[1].FindResultData!();
        this.ValidateFindingResultIsSuccess(this.OperandParameters[1]);
        this.ValidatePrecenceOfResultData(this.OperandParameters[1]);

        const dataToSearch = this.OperandParameters[0].ResultData;
        const dataToSearchFrom = this.OperandParameters[1].ResultData;
        const listOfIn: any[] = [];
        const typeOfInPar = typeof dataToSearchFrom;
        if (typeOfInPar === "string") {
          const strArray = (<string> dataToSearchFrom).split(/,/gu);
          strArray.forEach((o) => {
            listOfIn.push(o);
          });
        } else if (typeOfInPar === "object") {
          const objArray = dataToSearchFrom as any[];
          if (objArray != null) {
            objArray.forEach((o) => {
              listOfIn.push(o);
            });
          } else {
            listOfIn.push(dataToSearchFrom);
          }
        } else {
          listOfIn.push(dataToSearchFrom);
        }

        const result = listOfIn.findIndex((o) => {
          return o === dataToSearch;
        }) < 0;

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

}
