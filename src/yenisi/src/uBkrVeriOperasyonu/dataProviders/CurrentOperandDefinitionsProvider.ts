import { EnumOperandType,  } from '../enums/EnumOperandType';
import { EnumOperandDirection, } from '../enums/EnumOperandDirection';
import { IOperandDefinition,  } from '../interfaces/IOperandDefinition';
import axios from 'axios';

// todos: veri tabanından operand tanımları alınacak.
export class CurrentOperandDefinitionsProvider {

  async GetAllOperandDefinitions () {
    const response = await axios.get("http://10.75.5.36:8080/OperandDefinitions");
    const operandDefinitions = this.mapQueryResultToOperandDefinitions(response.data);
    return operandDefinitions;
  }
  async GetOperandDefinition (guid?: string, enumOperandType?: EnumOperandType): Promise<IOperandDefinition | undefined> {
    let operandDefinition: IOperandDefinition | undefined;
    if (guid != null) {
      const response = await axios.get(`http://10.75.5.36:8080/OperandDefinitions/ByGuid/${guid}`);
      const operandDefinitions = await this.mapQueryResultToOperandDefinitions([ response.data, ]);
      if (operandDefinitions.count > 0) {
        operandDefinition = operandDefinitions[0];
      }
    } else if (enumOperandType != null) {
      const response = await axios.get(`http://10.75.5.36:8080/OperandDefinitions/ByKey/${EnumOperandType[enumOperandType]}`);
      const operandDefinitions = await this.mapQueryResultToOperandDefinitions([ response.data, ]);
      if (operandDefinitions.count > 0) {
        operandDefinition = operandDefinitions[0];
      }
    }

    return operandDefinition;
  }
  private async mapQueryResultToOperandDefinitions (queryResultData: any[]) {
    const operandDefinitions: IOperandDefinition[] = await Promise.all(queryResultData.map(async (o) => {
      let enumOperandType: EnumOperandType | undefined;
      if (o.OperandTypeRef != null) {
        const response = await axios.get(`http://10.75.5.36:8080/OperandTypes/ByGuid/${o.OperandTypeRef.CollectionGuid}`);
        enumOperandType = EnumOperandType[<keyof typeof EnumOperandType>response.data.EnumKey];
      }
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
        EnumOperandType: enumOperandType,
      };
      return operandDef;
    }));
    return operandDefinitions;
  }

}
