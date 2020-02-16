import axios from "axios";

import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { MathNodeOptions } from "../Helpers/MathNodeOptions";
import { ICustomDataService } from "../interfaces/ICustomDataService";
import { IMathNode } from "../interfaces/IMathNode";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";
import { CurrentOperandDefinitionsProvider } from "./CurrentOperandDefinitionsProvider";

interface INodeDataForAppSaving {
  Guid?: string;
  FollowId?: string;
  NodeType?: string;
  OperandDefinitionRef?: string;
  OperandParameters?: INodeDataForAppSaving[];
  ParentGuid?: string;
  IsCustomNode?: boolean;
  Description?: string;
  ComplexMathExpression?: string;
  Data?: string;
}
interface INodeDataForAppReading {
  Guid?: string;
  FollowId?: string;
  NodeType?: string;
  OperandDefinitionRef?: {
    CollectionGuid?: string;
  };
  OperandParameters?: INodeDataForAppReading[];
  ParentGuid?: string;
  IsCustomNode?: boolean;
  Description?: string;
  ComplexMathExpression?: string;
  Data?: string;
}

export class CustomDefinedComplexServiceNodeProvider {

    /** Gets all nodes. Use just for test. */
    async GetAllCustomDefinedComplexServiceNodes (): Promise<IMathNode[] | undefined> {
      const responseForParent = await axios.get(`http://localhost:8080/DefinedComplexMathNodes`);
      const readedParentNodes: INodeDataForAppReading[] = responseForParent.data;
      readedParentNodes.forEach(async (readedParentNode) => {
        await this.readChildrenNodes(readedParentNode);
      });
      const convertedNodes: IMathNode[] = [];
      readedParentNodes.forEach(async (readedParentNode) => {
        const convertedNode = await this.convertNodesForReading(readedParentNode);
        convertedNodes.add(convertedNode!);
      });
      console.log(convertedNodes);
      return convertedNodes;
    }
    async GetCustomDefinedComplexServiceNode (nodeId: string, customDataService?: ICustomDataService): Promise<IMathNode | undefined> {
      const responseForParent = await axios.get(`http://localhost:8080/DefinedComplexMathNodes/ById/${nodeId}`);
      const readedParentNode: INodeDataForAppReading = responseForParent.data;
      await this.readChildrenNodes(readedParentNode);
      return this.convertNodesForReading(readedParentNode);
    }
    async SaveCustomDefinedCompexServiceNodes (node: IMathNode, parentNode?: IMathNode): Promise<void> {
      const nodeDataToSave = this.convertNodesForSaving(node, parentNode);
      const response = await axios.post("http://localhost:8080/DefinedComplexMathNodes", nodeDataToSave);
      console.log(response);
    }
    private convertNodesForSaving(node: IMathNode, parentNode?: IMathNode) {
      const dataToSave: INodeDataForAppSaving = {
        Guid: node.Guid,
        FollowId: node.Id,
        NodeType: node.EnumMathNodeType === EnumMathNodeType.Data ? "D" : "O",
        OperandDefinitionRef: node.Operand != null ? node.Operand.Guid : undefined,
        ParentGuid: parentNode != null ? parentNode.Guid : undefined,
        IsCustomNode: node.IsCustomNode,
        Description: node.Description,
        ComplexMathExpression: node.ComplexMathExpression,
        Data: node.ComplexMathExpression,
      };
      if (node.OperandParameters != null && node.OperandParameters.length > 0) {
        dataToSave.OperandParameters = [];
        node.OperandParameters.forEach((operandParameter) => {
          dataToSave.OperandParameters!.add(this.convertNodesForSaving(operandParameter, node));
        });
      }
      return dataToSave;
    }
    private async convertNodesForReading(appNode: INodeDataForAppReading, parentNode?: IMathNode, customDataService?: ICustomDataService) {
      let operandDefinition: IOperandDefinition | undefined;
      if (appNode.OperandDefinitionRef != null) {
        const currentOperandDefinitionsProvider = new CurrentOperandDefinitionsProvider();
        operandDefinition = await currentOperandDefinitionsProvider.GetOperandDefinition(appNode.OperandDefinitionRef.CollectionGuid);  
      }

      const mathNodeCreatorProps: Partial<IMathNodeCreatorProps> = {
        Guid: appNode.Guid,
        Id: appNode.FollowId,
        EnumMathNodeType: appNode.NodeType === "D" ? EnumMathNodeType.Data : EnumMathNodeType.Operand,
        EnumOperandType: operandDefinition != null ? operandDefinition.EnumOperandType : undefined,
        ParentNode: parentNode,
        Data: appNode.Data,
        Description: appNode.Description,
        IsCustomNode: appNode.IsCustomNode,
        CustomDataService: customDataService,
        ComplexMathExpression: appNode.ComplexMathExpression,
      };
      const createdNode = await MathNodeOptions.CreateMathNode(mathNodeCreatorProps);
      if (appNode.OperandParameters != null && appNode.OperandParameters.count > 0) {
        createdNode!.OperandParameters = [];
        appNode.OperandParameters.forEach(async (operandParameter) => {
          const createdChild = await this.convertNodesForReading(operandParameter, createdNode, customDataService);
          createdNode!.OperandParameters!.add(createdChild!);
        });
      }
      return createdNode;
    }
    private async readChildrenNodes(appNode: INodeDataForAppReading) {
      const responseForChildren = await axios.get(`http://localhost:8080/DefinedComplexMathNodes/ByParentGuid/${appNode.Guid}`);
      const readedChildrenNodes = responseForChildren.data as INodeDataForAppReading[];
      if (readedChildrenNodes != null && readedChildrenNodes.length > 0) {
        appNode.OperandParameters = [];
        readedChildrenNodes.forEach(async (readedChildNode) => {
          appNode.OperandParameters!.add(readedChildNode);
          await this.readChildrenNodes(readedChildNode)
        });
      }
    }
    

}
