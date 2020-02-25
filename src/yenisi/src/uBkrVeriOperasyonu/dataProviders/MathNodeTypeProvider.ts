import { IMathNodeType, } from '../interfaces/IMathNodeType';
import { EnumMathNodeType, } from '../enums/EnumMathNodeType';
import axios from 'axios';

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
    async GetMathNodeType (guid?: string, enumMathNodeType?: EnumMathNodeType): Promise<IMathNodeType | undefined> {
      let nodeType: IMathNodeType | undefined;
      if (guid != null) {
        const response = await axios.get(`http:localhost:8080/MathNodeTypes/ByGuid/${guid}`);
        nodeType = JSON.parse(response.data);
      } else if (enumMathNodeType != null) {
        const response = await axios.get(`http:localhost:8080/MathNodeTypes/ByEnumKey/${enumMathNodeType}`);
        nodeType = JSON.parse(response.data);
      }
      return nodeType;
    }

}
