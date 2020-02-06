import { EnumMathNodeType, } from "../enums/EnumMathNodeType";
import { ICustomDefinedComplexServiceNode, } from "../interfaces/ICustomDefinedComplexServiceNode";
import { IMathNode, } from "../interfaces/IMathNode";
import { IMathNodeCreatorProps, } from '../interfaces/IMathNodeCreatorProps';
import { MathNodeOptions, } from "../MathNodeOptions";
import { MathNodeTypeProvider,  } from './MathNodeTypeProvider';
import { CurrentOperandDefinitionsProvider, } from "./CurrentOperandDefinitionsProvider";
import { ICustomDataService, } from '../interfaces/ICustomDataService';
import { EnumOperandType, } from '../enums/EnumOperandType';
import { OperandTypeProvider,  } from './OperandTypeProvider';
import { IOperandDefinition, } from '../interfaces/IOperandDefinition';
import { IOperandType, } from '../interfaces/IOperandType';
import { GuidProvider, } from './GuidProvider';

export class CustomDefinedComplexServiceNodeProvider {

    private static m_CustomDefinedComplexServiceNodes: ICustomDefinedComplexServiceNode[] = [
      {
        Guid: "62f49dc0-391b-11ea-8d0f-797890298d4d",
        Id: "1",
        NodeTypeRef: "8e74fac0-391c-11ea-8d0f-797890298d4d",
        OperandTypeRef: "b7d11c30-4044-11ea-8cc9-6d4f591fd4bf",
        Description: "Test Plus operand",
        IsCustomNode: true,
        ActiveCd: "A",
        Data: "«2»+«3»",
        ComplexMathExpression: "«2»+7",
      },
      {
        Guid: "f97906a0-391b-11ea-8d0f-797890298d4d",
        Id: "2",
        NodeTypeRef: "cf7f85d0-391c-11ea-8d0f-797890298d4d",
        ParentGuidRef: "62f49dc0-391b-11ea-8d0f-797890298d4d",
        Description: "Test Data 1",
        IsCustomNode: true,
        ActiveCd: "A",
        Data: "5",
        ComplexMathExpression: "5",
        ParameterOrder: 1,
      },
      {
        Guid: "2ebf06c0-391c-11ea-8d0f-797890298d4d",
        Id: "3",
        NodeTypeRef: "cf7f85d0-391c-11ea-8d0f-797890298d4d",
        ParentGuidRef: "62f49dc0-391b-11ea-8d0f-797890298d4d",
        Description: "Test Data 2",
        IsCustomNode: false,
        ActiveCd: "A",
        Data: "7",
        ComplexMathExpression: "7",
        ParameterOrder: 2,
      },
      {
        Guid: "485ba740-3b75-11ea-b2ff-094d6390ec09",
        Id: "4",
        NodeTypeRef: "8e74fac0-391c-11ea-8d0f-797890298d4d",
        OperandTypeRef: "c3438f80-4044-11ea-8cc9-6d4f591fd4bf",
        Description: "Müşteri tipine göre meslek uygun mu?",
        IsCustomNode: true,
        ActiveCd: "A",
        Data: "«7» in «6»",
        ComplexMathExpression: "«7» in «6»",
      },
      {
        Guid: "ed7aec90-3b75-11ea-b2ff-094d6390ec09",
        Id: "5",
        NodeTypeRef: "cf7f85d0-391c-11ea-8d0f-797890298d4d",
        ParentGuidRef: undefined,
        Description: "Müşteri tipi.",
        IsCustomNode: true,
        Data: "#1",
        ComplexMathExpression: "#1",
        ActiveCd: "A",
      },
      {
        Guid: "f4f8a610-3b75-11ea-b2ff-094d6390ec09",
        Id: "6",
        NodeTypeRef: "cf7f85d0-391c-11ea-8d0f-797890298d4d",
        ParentGuidRef: "485ba740-3b75-11ea-b2ff-094d6390ec09",
        Description: "Müşteri tipine göre uygun olmayan meslekler.",
        IsCustomNode: true,
        Data: "#2",
        ComplexMathExpression: "#2",
        ActiveCd: "A",
        ParameterOrder: 2,
      },
      {
        Guid: "485353c0-3b7e-11ea-a91b-2d1fe1232b04",
        Id: "7",
        NodeTypeRef: "cf7f85d0-391c-11ea-8d0f-797890298d4d",
        ParentGuidRef: "485ba740-3b75-11ea-b2ff-094d6390ec09",
        Description: "Müşteri mesleği.",
        IsCustomNode: true,
        Data: "#3",
        ComplexMathExpression: "#3",
        ActiveCd: "A",
        ParameterOrder: 1,
      },
    ];

    /** Gets all nodes. Use just for test. */
    async GetAllCustomDefinedComplexServiceNodes (): Promise<IMathNode[] | undefined> {
      return new Promise<IMathNode[] | undefined>((resolve, reject) => {
        try {
          const customDefinedNode = CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.filter((o) => {
            return o.IsCustomNode === true && o.ActiveCd === "A";
          }).map((o) => {
            const node = this.convertTableRowsToMathNodes(o);
            return node!;
          });
          return resolve(customDefinedNode);
        } catch (error) {
          return reject(error);
        }
      });
    }
    async GetCustomDefinedComplexServiceNode (nodeId?: string, dataServiceId?: string, customDataService?: ICustomDataService): Promise<IMathNode | undefined> {
      return new Promise<IMathNode | undefined>(async (resolve, reject) => {
        try {
          const tableRow = CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.find((o) => {
            if (nodeId != null) {
              return o.Id === nodeId && o.ActiveCd === "A";
            } else if (dataServiceId != null) {
              return o.Data === `#${dataServiceId}` && o.ActiveCd === "A";
            }
            return false;
          });
          let node: IMathNode | undefined;
          if (tableRow != null) {
            node = this.convertTableRowsToMathNodes(tableRow, customDataService);
          }
          return resolve(node);
        } catch (error) {
          return reject(error);
        }
      });
    }
    async SaveCustomDefinedCompexServiceNodes (node: IMathNode, parentNode?: IMathNode): Promise<void> {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const nodeToBeUpdate = CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.find((o) => {
            return o.Id === node.Id && o.ActiveCd === "A";
          });
          if (nodeToBeUpdate != null) {
            await this.DeleteCustomDefinedComplexServiceNode(node);
          }
          const table = this.convertMathNodesToTable(node, parentNode);
          CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.addRange(table);
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }
    async DeleteCustomDefinedComplexServiceNode (node: IMathNode): Promise<void> {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const nodeToBeUpdate = CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.find((o) => {
            return o.Id  === node.Id && o.ActiveCd === "A";
          });
          if (nodeToBeUpdate != null) {
            nodeToBeUpdate.ActiveCd = "I";
            if (node.OperandParameters != null) {
              node.OperandParameters.forEach(async (o) => {
                await this.DeleteCustomDefinedComplexServiceNode(o);
              });
            }
          }
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
    }

    private convertMathNodesToTable (node: IMathNode, parentNode?: IMathNode): ICustomDefinedComplexServiceNode[] {
      const table: ICustomDefinedComplexServiceNode[] = [];
      let tableRow = CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.find((o) => {
        return o.Id === node.Id && o.ActiveCd === "A";
      });
      if (tableRow == null) {
        const mathNodeTypeProvider = new MathNodeTypeProvider();
        const nodeType = mathNodeTypeProvider.GetMathNodeType(undefined, node.EnumMathNodeType);
        let operandType: IOperandType | undefined;
        if (node.Operand != null) {
          const operandTypeProvider = new OperandTypeProvider();
          operandType = operandTypeProvider.GetOperandType(undefined, node.Operand.EnumOperandType);
        }
        const newGuid = GuidProvider.GetGuid();
        tableRow = {
          Guid: newGuid,
          Id: node.Id,
          ParentGuidRef: parentNode != null ? parentNode.Guid : undefined,
          Data: node.ComplexMathExpression,
          NodeTypeRef: nodeType != null ? nodeType.Guid : "",
          ActiveCd: "A",
          IsCustomNode: node.IsCustomNode,
          OperandTypeRef: operandType != null ? operandType.Guid : undefined,
          Description: node.Description,
          ParameterOrder: parentNode != null ? parentNode.OperandParameters!.findIndex((o) => {
            return o.Guid === node.Guid;
          }) : 1,
          ComplexMathExpression: node.ComplexMathExpression,
        };
        table.push(tableRow);
        if (node.OperandParameters != null) {
          node.OperandParameters.forEach((child) => {
            const children = this.convertMathNodesToTable(child, node);
            table.addRange(children);
          });
        }
      }
      return table;
    }
    private convertTableRowsToMathNodes (tableRow: ICustomDefinedComplexServiceNode, customDataService?: ICustomDataService, parentNode?: IMathNode): IMathNode | undefined {
      let operandDefinition: IOperandDefinition | undefined;
      if (tableRow.OperandTypeRef != null) {
        const operandTypeProvider = new OperandTypeProvider();
        const operandType = operandTypeProvider.GetOperandType(tableRow.OperandTypeRef)!;
        const enumKeyOfOperandType = <keyof typeof EnumOperandType> operandType.EnumKey;
        const enumOperandType = EnumOperandType[enumKeyOfOperandType];
        const currentOperandDefinitionsProvider = new CurrentOperandDefinitionsProvider();
        operandDefinition = currentOperandDefinitionsProvider.GetOperandDefinition(undefined, enumOperandType);
      }
      const mathNodeTypeProvider = new MathNodeTypeProvider();
      const mathNodeType = mathNodeTypeProvider.GetMathNodeType(tableRow.NodeTypeRef!)!;
      const enumKeyOfMathNodeType = <keyof typeof EnumMathNodeType> mathNodeType.EnumKey;
      const enumMathNodeType = EnumMathNodeType[enumKeyOfMathNodeType];
      const mathNodeCreatorProps: Partial<IMathNodeCreatorProps> = {
        Guid: tableRow.Guid,
        Id: tableRow.Id,
        EnumMathNodeType: enumMathNodeType,
        EnumOperandType: operandDefinition != null ? operandDefinition.EnumOperandType : undefined,
        ParentNode: parentNode,
        Operand: operandDefinition,
        Data: tableRow.Data,
        Description: tableRow.Description,
        IsCustomNode: tableRow.IsCustomNode,
        CustomDataService: customDataService,
        ComplexMathExpression: tableRow.ComplexMathExpression,
      };
      const createdNode = MathNodeOptions.CreateMathNode(mathNodeCreatorProps);
      if (createdNode != null) {
        const children = CustomDefinedComplexServiceNodeProvider.m_CustomDefinedComplexServiceNodes.filter((o) => {
          return o.ParentGuidRef === createdNode.Guid;
        }).sort((a, b) => {
          if (a.ParameterOrder != null && b.ParameterOrder != null) {
            return a.ParameterOrder - b.ParameterOrder;
          }
          return 0;
        });
        children.forEach((child) => {
          const createdChildNode = this.convertTableRowsToMathNodes(child, customDataService, createdNode);
            createdNode.OperandParameters!.add(createdChildNode);
        });
      }
      return createdNode;
    }

}
