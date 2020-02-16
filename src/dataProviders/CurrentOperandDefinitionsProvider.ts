import axios from "axios";

import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { EnumOperandType } from "../enums/EnumOperandType";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";

// todos: veri tabanından operand tanımları alınacak.
export class CurrentOperandDefinitionsProvider {

  async GetAllOperandDefinitions () {
    const response = await axios.get("http://localhost:8080/OperandDefinitions");
    const operandDefinitions = this.mapQueryResultToOperandDefinitions(response.data);
    return operandDefinitions;
  }
  async GetOperandDefinition (guid?: string, enumOperandType?: EnumOperandType): Promise<IOperandDefinition | undefined> {
    let operandDefinition: IOperandDefinition | undefined;
    if (guid != null) {
      const response = await axios.get(`http://localhost:8080/OperandDefinitions/ByGuid/${guid}`);
      const operandDefinitions = this.mapQueryResultToOperandDefinitions(response.data);
      if (operandDefinitions.count > 0) {
        operandDefinition = operandDefinitions[0];
      }
    } else if (enumOperandType != null) {
      const response = await axios.get(`http://localhost:8080/OperandDefinitions/ByKey/${EnumOperandType[enumOperandType]}`);
      const operandDefinitions = this.mapQueryResultToOperandDefinitions(response.data);
      if (operandDefinitions.count > 0) {
        operandDefinition = operandDefinitions[0];
      }
    }

    return operandDefinition;
  }
  private mapQueryResultToOperandDefinitions(queryResultData: any[]) {
    const operandDefinitions: IOperandDefinition[] = queryResultData.map((o) => {
      const operandDef: IOperandDefinition = {
        Guid: o.Guid,
        Precedence: o.Precedence,
        Key: o.Key,
        IsGrouping: o.IsGrouping,
        Direction: o.OperandDirection === "LR" ? EnumOperandDirection.LeftToRight : EnumOperandDirection.RightToLeft,
        ThereIsLeftParameter: o.ThereIsLeftParameter,
        ThereIsRighParameter: o.ThereIsRightParameter,
        Description: o.Description,
        OperandRegexStr: o.OperandRegexStr,
        OperandParRegexStr: o.OperandParRegexStr,
        EnumOperandType: o.OperandType != null ? EnumOperandType[<keyof typeof EnumOperandType>o.OperandType.EnumKey] : undefined
      };
      return operandDef;
    });
    return operandDefinitions;
  }

}
