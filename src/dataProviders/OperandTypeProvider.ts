import axios from "axios";

import { EnumOperandType } from "../enums/EnumOperandType";
import { IOperandType } from "../interfaces/IOperandType";

export class OperandTypeProvider {

    async GetAllOperandTypes () {
      const response = await axios.get("http://localhost:8080/OperandTypes");
      const operandTypes = response.data as IOperandType[];
      return operandTypes;
    };
    async GetOperandType (guid?: string, enumOperandType?: EnumOperandType) {
      let operandType: IOperandType | undefined;
      if (guid != null) {
        const response = await axios.get(`http://localhost:8080/OperandTypes/ByGuid/${guid}`);
        const operandTypes = response.data as IOperandType[];
        if (operandTypes != null && operandTypes.length > 0) {
          operandType = operandTypes[0];
        }
      } else if (enumOperandType != null) {
        const response = await axios.get(`http://localhost:8080/OperandTypes/ByEnumKey/${EnumOperandType[enumOperandType]}`);
        const operandTypes = response.data as IOperandType[];
        if (operandTypes != null && operandTypes.length > 0) {
          operandType = operandTypes[0];
        }
      }
      return operandType;
    }

}
