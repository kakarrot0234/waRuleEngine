import { IMathNodeType, } from '../interfaces/IMathNodeType';
import { EnumMathNodeType, } from '../enums/EnumMathNodeType';

export class MathNodeTypeProvider {

    private static m_CurrentMathNodeTypes: IMathNodeType[] = [
      {
        Guid: "cf7f85d0-391c-11ea-8d0f-797890298d4d",
        EnumKey: "Data",
      },
      {
        Guid: "8e74fac0-391c-11ea-8d0f-797890298d4d",
        EnumKey: "Operand",
      },
    ];

    GetAllMathNodeTypes () : IMathNodeType[] {
      return MathNodeTypeProvider.m_CurrentMathNodeTypes;
    };
    GetMathNodeType (guid?: string, enumMathNodeType?: EnumMathNodeType): IMathNodeType | undefined {
      let nodeType: IMathNodeType | undefined;
      if (guid != null) {
        nodeType = MathNodeTypeProvider.m_CurrentMathNodeTypes.find((o) => {
          return o.Guid === guid;
        });
      } else if (enumMathNodeType != null) {
        nodeType = MathNodeTypeProvider.m_CurrentMathNodeTypes.find((o) => {
          return o.EnumKey === EnumMathNodeType[enumMathNodeType];
        });
      }
      return nodeType;
    }

}
