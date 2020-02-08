import { CustomDefinedDataServiceNodeProvider } from "../dataProviders/CustomDefinedDataServiceNodeProvider";
import { MathNode } from "../Helpers/MathNode";
import { ICustomDataService } from "../interfaces/ICustomDataService";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";

export class MathNodeData extends MathNode {

  private m_Data: any | undefined;
  private m_CustomDataService: ICustomDataService | undefined;

  constructor (props: Partial<IMathNodeCreatorProps>) {
    super({
      ...props,
      IsParameterCountFixed: true,
    });
    this.m_Data = props.Data;
    this.m_CustomDataService = props.CustomDataService;
  }

  IsValid (): IIsValidResult {
    if (this.m_Data == null) {
      return { IsValid: false, Message: "For MathNode of type Data, there must be a provided data!", };
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

        if (typeof this.m_Data === "string") {
          const regex = /^#(\w+)$/gu;
          const regexResult = regex.exec(this.m_Data);
          if (regexResult != null) {
            if (this.m_CustomDataService != null) {
              const definedDataSeviceNode = await new CustomDefinedDataServiceNodeProvider().GetCustomDefinedDataServiceNode(regexResult[1]);
              if (definedDataSeviceNode != null) {
                return resolve(this.m_CustomDataService(definedDataSeviceNode.DataKey!));
              }
              throw new Error(`There shuld be a defined Custom Data Service Node with its id is: ${regexResult[1]}`);
            }
            throw new Error(`You should provide a CustomDataService for DataNode that its id is: ${this.Id}`);
          }
        }

        return resolve(this.m_Data);
      } catch (error) {
        return reject(error);
      }
    });
  }

}
