import { EnumMathNodeResultFoundCd } from "../enums/EnumMathNodeResultFoundCd";
import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { IMathNode } from "../interfaces/IMathNode";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";

export abstract class MathNode implements IMathNode {

  constructor (props: IMathNodeCreatorProps) {
    this.Description = props.Description;
    this.Guid = props.Guid;
    this.Id = props.Id;
    this.IsCustomNode = props.IsCustomNode;
    this.IsParameterCountFixed = props.IsParameterCountFixed!;
    this.Operand = props.Operand;
    this.ParentNode = props.ParentNode;
    this.EnumMathNodeType = props.EnumMathNodeType;
    this.ComplexMathExpression = props.ComplexMathExpression != null ? props.ComplexMathExpression : "";
  }

    public Guid: string | undefined;
    public Id: string | undefined;
    public ResultFoundCd = EnumMathNodeResultFoundCd.NotFoundYet;
    public ResultData: any | undefined;
    public ResultError: any | undefined;
    public Operand: IOperandDefinition | undefined;
    public OperandParameters: IMathNode[] = [];
    public ParentNode: IMathNode | undefined;
    public IsParameterCountFixed: boolean;
    public IsCustomNode: boolean | undefined;
    public Description: string | undefined;
    public EnumMathNodeType: EnumMathNodeType | undefined;
    public ComplexMathExpression: string | undefined;

    public IsValid (): IIsValidResult {
      return { IsValid: true, };
    }
    public async FindResultData (): Promise<void> {
      return new Promise<any>(async (resolve) => {
        try {
          this.ResultData = await this.SelfFindResultData();
          this.ResultFoundCd = EnumMathNodeResultFoundCd.Found;
          return resolve();
        } catch (error) {
          this.ResultFoundCd = EnumMathNodeResultFoundCd.Error;
          this.ResultError = error;
          return resolve();
        }
      });
    }
    protected abstract SelfFindResultData(): Promise<any>;
    protected ValidateFindingResultIsSuccess (ruleNode: IMathNode) {
      if (ruleNode.ResultData == null) {
        throw new Error(`Finding Result data of the Node that its id number is '${ruleNode.Id}' was not success!`);
      }
    }
    protected ValidatePrecenceOfResultData (ruleNode: IMathNode) {
      if (ruleNode.ResultData == null) {
        throw new Error(`Result data of the Node that its id number is '${ruleNode.Id}' was not found!`);
      }
    }
    protected ValidateTypeOfResultDataIsNumber (ruleNode: IMathNode) {
      const typeOfResultData = typeof ruleNode.ResultData;

      if (typeOfResultData !== "number") {
        throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.Id}' must be of type '${typeOfResultData}'`);
      }
    }
    protected ValidateTypeOfResultDataIsBoolean (ruleNode: IMathNode) {
      const typeOfResultData = typeof ruleNode.ResultData;

      if (typeOfResultData !== "boolean") {
        throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.Id}' must be of type '${typeOfResultData}'`);
      }
    }
    protected ValidateTypeOfResultDataIsAcceptable (listOfAcceptedTypes: string[], ruleNode: IMathNode) {
      const typeOfResultData = typeof ruleNode.ResultData;

      if (!listOfAcceptedTypes.includes(typeOfResultData)) {
        let acceptedTypesStr = "";

        for (let index = 0; index < listOfAcceptedTypes.length; index++) {
          const acceptedType = listOfAcceptedTypes[index];

          if (index === listOfAcceptedTypes.length - 1) {
            acceptedTypesStr += acceptedType;
          } else {
            acceptedTypesStr += `${acceptedType}, `;
          }
        }
        throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.Id}' must be one of type from: '${acceptedTypesStr}'`);
      }
    }

}
