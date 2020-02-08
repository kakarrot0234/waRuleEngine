import { EnumOperandType } from "../enums/EnumOperandType";
import { IOperandType } from "../interfaces/IOperandType";

export class OperandTypeProvider {

    private static m_CurrentOperandTypes: IOperandType[] = [
      {
        Guid: "b7d11c30-4044-11ea-8cc9-6d4f591fd4bf",
        EnumKey: "Plus",
      },
      {
        Guid: "c3438f80-4044-11ea-8cc9-6d4f591fd4bf",
        EnumKey: "In",
      },
    ];

    GetAllOperandTypes () : IOperandType[] {
      return OperandTypeProvider.m_CurrentOperandTypes;
    };
    GetOperandType (guid?: string, enumOperandType?: EnumOperandType): IOperandType | undefined {
      let operandType: IOperandType | undefined;
      if (guid != null) {
        operandType = OperandTypeProvider.m_CurrentOperandTypes.find((o) => {
          return o.Guid === guid;
        });
      } else if (enumOperandType != null) {
        operandType = OperandTypeProvider.m_CurrentOperandTypes.find((o) => {
          return o.EnumKey === EnumOperandType[enumOperandType];
        });
      }
      return operandType;
    }

}
