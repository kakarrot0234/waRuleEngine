import { ICustomDefinedDataServiceNode, } from "../interfaces/ICustomDefinedDataServiceNode";
import * as uuid from "uuid";
import { IdProvider, } from './IdProvider';
import { CustomDefinedComplexServiceNodeProvider, } from './CustomDefinedComplexServiceNodeProvider';
import { EnumMathNodeType, } from "../enums/EnumMathNodeType";

export class CustomDefinedDataServiceNodeProvider {

    private static m_CustomDefinedDataServiceNodes: ICustomDefinedDataServiceNode[] = [
      {
        Guid: "c4ac82a0-3923-11ea-9ebe-a71b802ed5f3",
        Id: "1",
        DataKey: "MusteriTipi",
        Description: "Müşterinin Bireysel Krediler Başvuru Değerlendirme süreci içerisinde kabul edildiği kategorisi.",
        ActiveCd: "A",
      },
      {
        Guid: "cb45cf90-3923-11ea-9ebe-a71b802ed5f3",
        Id: "2",
        DataKey: "UygunOlmayanMeslekler",
        Description: "Müşteri tipine göre uygun olmayan meslek listesi.",
        ActiveCd: "A",
      },
      {
        Guid: "1bebae90-3b7e-11ea-a91b-2d1fe1232b04",
        Id: "3",
        DataKey: "MusteriMeslegi",
        Description: "Müşteri mesleği.",
        ActiveCd: "A",
      },
    ];

    async GetAllCustomDefinedDataServiceNodes (): Promise<ICustomDefinedDataServiceNode[]> {
      return new Promise<ICustomDefinedDataServiceNode[]>(async (resolve, reject) => {
        try {
          const nodes = CustomDefinedDataServiceNodeProvider.m_CustomDefinedDataServiceNodes.filter((o) => {
            return o.ActiveCd === "A";
          });
          return resolve(nodes);
        } catch (error) {
          return reject(error);
        }
      });
    }
    async GetCustomDefinedDataServiceNode (id?: string, dataKey?: string): Promise<ICustomDefinedDataServiceNode | undefined> {
      return new Promise<ICustomDefinedDataServiceNode |undefined>(async (resolve, reject) => {
        try {
          let node: ICustomDefinedDataServiceNode | undefined;
          if (id != null) {
            node = CustomDefinedDataServiceNodeProvider.m_CustomDefinedDataServiceNodes.find((o) => {
              return o.Id === id;
            });
          } else if (dataKey != null) {
            node = CustomDefinedDataServiceNodeProvider.m_CustomDefinedDataServiceNodes.find((o) => {
              return o.DataKey === dataKey;
            });
          }
          return resolve(node);
        } catch (error) {
          return reject(error);
        }
      });
    }
    async SaveCustomDefinedDataServiceNodes (node: ICustomDefinedDataServiceNode): Promise<void> {
      return new Promise<void>(async (resolve, reject) => {
        try {
          if (node.Id != null) {
            await this.DeleteCustomDefinedDataServiceNode(node.Id!);
          }

          const dataServiceNodeId = node.Id != null ? node.Id : IdProvider.GetNewDataServiceNodeId();
          const dataServiceNode: ICustomDefinedDataServiceNode = {
            Id: dataServiceNodeId,
            Guid: uuid.v1(),
            DataKey: node.DataKey,
            Description: node.Description,
            ActiveCd: node.ActiveCd,
          };
          CustomDefinedDataServiceNodeProvider.m_CustomDefinedDataServiceNodes.add(dataServiceNode);
          const customDefinedComplexServiceNodeProvider = new CustomDefinedComplexServiceNodeProvider();
          let mathNode = await customDefinedComplexServiceNodeProvider.GetCustomDefinedComplexServiceNode(undefined, dataServiceNodeId);
          if (mathNode == null) {
            mathNode = {
              ComplexMathExpression: `#${dataServiceNode.Id}`,
              Description: dataServiceNode.Description,
              EnumMathNodeType: EnumMathNodeType.Data,
              IsCustomNode: true,
            };
          }
          await customDefinedComplexServiceNodeProvider.SaveCustomDefinedCompexServiceNodes(mathNode);
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }
    async DeleteCustomDefinedDataServiceNode (id: string): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        try {
          const nodeToBeDelete = CustomDefinedDataServiceNodeProvider.m_CustomDefinedDataServiceNodes.find((o) => {
            return o.Id === id && o.ActiveCd === "A";
          });
          if (nodeToBeDelete != null) {
            nodeToBeDelete.ActiveCd = "I";
          }
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }

}
