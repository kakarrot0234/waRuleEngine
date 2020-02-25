import { CurrentOperandDefinitionsProvider } from "../dataProviders/CurrentOperandDefinitionsProvider";
import { CustomDefinedComplexServiceNodeProvider } from "../dataProviders/CustomDefinedComplexServiceNodeProvider";
import { IdProvider } from "../dataProviders/IdProvider";
import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { EnumOperandDirection } from "../enums/EnumOperandDirection";
import { IGeneralTree } from "../interfaces/IGeneralTreeNode";
import { IMathNode } from "../interfaces/IMathNode";
import { IMathNodeCreatorProps } from "../interfaces/IMathNodeCreatorProps";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";
import { MathNodeOptions } from "./MathNodeOptions";

export class MathNodeTreeFormuletor {

  private m_WrappedSearchResult: IGeneralTree[] = [];

  public async CreateMathNode (expression: string, description?: string) {
    const node = await this.convertMathExpressionToTree(expression);
    if (node != null) {
      node.IsCustomNode = true;
      node.Description = description;
      node.ComplexMathExpression = this.getComplexMathNodeExpresstion(node);
    }
    return node;
  }
  public async UpdateMathNode (nodeToBeUpdate: IMathNode, newMathDefinition?: string, newDescription?: string) {
    let updatedNode: IMathNode | undefined;
    if (newMathDefinition != null && nodeToBeUpdate.ComplexMathExpression !== newMathDefinition) {
      updatedNode = await this.convertMathExpressionToTree(newMathDefinition, nodeToBeUpdate.ParentNode);
      if (updatedNode != null) {
        updatedNode.Id = nodeToBeUpdate.Id;
        updatedNode.IsCustomNode = nodeToBeUpdate.IsCustomNode;
        updatedNode.ComplexMathExpression = this.getComplexMathNodeExpresstion(updatedNode);
      }
    } else {
      updatedNode = { ...nodeToBeUpdate, };
    }
    if (updatedNode != null) {
      updatedNode.Description = newDescription;
    }
    return updatedNode;
  }
  private async convertMathExpressionToTree (expression: string, parentMathNode?: IMathNode) {
    const allOperands = await new CurrentOperandDefinitionsProvider().GetAllOperandDefinitions();
    const operandsToLookFor = this.findOperandsToLookFor(expression, allOperands);
    await this.simplifyFormule(expression, operandsToLookFor, allOperands);
    const rootBinaryNodeRoot = this.m_WrappedSearchResult[this.m_WrappedSearchResult.length - 1];
    let ruleNodeRoot: IMathNode | undefined;
    if (rootBinaryNodeRoot != null) {
      ruleNodeRoot = await this.createBinaryTree(rootBinaryNodeRoot, parentMathNode);
    }
    return ruleNodeRoot;
  }
  private findOperandsToLookFor (expression: string, allOperands: IOperandDefinition[]) {
    const operandsToLookFor: string[] = [];
    const allOperandDefs = allOperands.sort((a, b) => {
      return b.Key.length - a.Key.length;
    });
    allOperandDefs.forEach((operandDef) => {
      const regexOperand = new RegExp(operandDef.OperandRegexStr, "gu");
      const regexOperandResult = regexOperand.exec(expression);

      if (regexOperandResult != null) {
        operandsToLookFor.add(operandDef.Key);
      }
    });

    return operandsToLookFor;
  }
  private async simplifyFormule (expression: string, operandsToLookFor: string[], allOperands: IOperandDefinition[]) {
    let expressionLast = expression;
    const orderedOperands = allOperands.filter((o) => {
      return operandsToLookFor.indexOf(o.Key) >= 0;
    }).sort((a, b) => {
      if (a.Precedence === b.Precedence) {
        return b.Key.length - a.Key.length;
      }
      return a.Precedence - b.Precedence;
    });

    if (orderedOperands.length > 0) {
      for (let index = 0; index < orderedOperands.length; index++) {
        const operandToLookFor = orderedOperands[index];
        let success: boolean;

        do {
          [ success, expressionLast, ] = await this.findTreeNode(operandToLookFor, expressionLast);
        } while (success);
      }
    } else {
      const nodeId = await this.createNodeId();
      this.m_WrappedSearchResult.add({ Id: nodeId, Data: expressionLast, });
    }
  }
  private async findTreeNode (operand: IOperandDefinition, expression: string): Promise<[boolean, string]> {
    let expressionLast = expression;
    let success = false;

    if (operand.IsGrouping) {
      [ success, expressionLast, ] = await this.searchForGroup(operand, expressionLast);
    } else {
      const regexStr = operand.OperandParRegexStr;
      const regex = new RegExp(regexStr, "gu");
      if (operand.Direction === EnumOperandDirection.LeftToRight) {
        const regexResult = regex.exec(expressionLast);
        if (regexResult != null) {
          const nodeId = await this.createNodeId();
          const addingWrappedSearchResult: IGeneralTree = {
            Id: nodeId,
            Data: regexResult[0],
            Operand: operand,
            ParDatas: [],
          };
          for (let index = 1; index <= operand.ParameterCount!; index++) {
            addingWrappedSearchResult.ParDatas!.push(regexResult[index]);
          }
          this.m_WrappedSearchResult.add(addingWrappedSearchResult);
          expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
          success = true;
        }
      } else if (operand.Direction === EnumOperandDirection.RightToLeft) {
        let previousRegexResult: RegExpExecArray | null;
        let currentRegexResult = regex.exec(expressionLast);
        do {
          previousRegexResult = currentRegexResult;
          currentRegexResult = regex.exec(expressionLast);
        } while (currentRegexResult != null);
        if (previousRegexResult != null) {
          const regexResult = previousRegexResult;
          const nodeId = await this.createNodeId();
          const addingWrappedSearchResult: IGeneralTree = {
            Id: nodeId,
            Data: regexResult[0],
            Operand: operand,
            ParDatas: [],
          };
          for (let index = 1; index <= operand.ParameterCount!; index++) {
            addingWrappedSearchResult.ParDatas!.push(regexResult[index]);
          }
          this.m_WrappedSearchResult.add(addingWrappedSearchResult);
          expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
          success = true;
        }
      }
    }

    return [ success, expressionLast, ];
  }
  private async searchForGroup (operand: IOperandDefinition, expression: string): Promise<[boolean, string]> {
    const regex = new RegExp(`${operand.OperandParRegexStr}`, "gu");
    let expressionLast = expression;
    let regexResult = regex.exec(expressionLast);

    while (regexResult) {
      const nodeId = await this.createNodeId();
      this.m_WrappedSearchResult.add({ Id: nodeId, Data: regexResult[1], IsGrouping: true, });
      expressionLast = expressionLast.replace(regex, `«${nodeId}»`);
      regexResult = regex.exec(expressionLast);
    }

    return [ expression !== expressionLast, expressionLast, ];
  }
  private async createNodeId () {
    return await IdProvider.GetNewComplexMathNodeId();
  }
  private async createBinaryTree (binaryNode: IGeneralTree, parentMathNode?: IMathNode): Promise<IMathNode | undefined> {
    let mathNode: IMathNode | undefined;

    if (binaryNode.IsGrouping != null && binaryNode.IsGrouping) {
      mathNode = await new MathNodeTreeFormuletor().convertMathExpressionToTree(binaryNode.Data, parentMathNode);
    } else {
      if (binaryNode.Operand != null) {
        const mathNodeCreatorProps: Partial<IMathNodeCreatorProps> = {
          Id: binaryNode.Id,
          EnumMathNodeType: EnumMathNodeType.Operand,
          EnumOperandType: binaryNode.Operand.EnumOperandType,
          ParentNode: parentMathNode,
          Data: binaryNode.Data,
          ComplexMathExpression: binaryNode.Data,
          SimpleMathExpression: binaryNode.Data,
          IsCustomNode: binaryNode.IsCustomNode,
          Description: binaryNode.Description,
        };
        mathNode = await MathNodeOptions.CreateMathNode(mathNodeCreatorProps)!;

        if (mathNode != null) {
          for (let index = 0; index < binaryNode.ParDatas!.length; index++) {
            const parNode = await this.nodeDataToMathNode(undefined, binaryNode.ParDatas![index], undefined, mathNode);
            mathNode.OperandParameters!.add(parNode!);
          }
        }
      } else {
        mathNode = await this.nodeDataToMathNode(binaryNode.Id, binaryNode.Data, undefined, parentMathNode);
      }
    }

    return mathNode;
  }
  private async nodeDataToMathNode (mathNodeId: string | undefined, data: any, description?: string, parentMathNode?: IMathNode) {
    let mathNode: IMathNode | undefined;
    const typeofData = typeof data;

    if (typeofData === "string") {
      const regex = /^«(\w+)»$/gu;
      const regexResult = regex.exec(data);

      if (regexResult != null) {
        const groupNode = this.m_WrappedSearchResult.find((o) => {
          return o.Id === regexResult![1];
        });
        if (groupNode != null) {
          mathNode = await this.createBinaryTree(groupNode, parentMathNode);
        } else {
          const customDefinedComplexServiceNodeProvider = new CustomDefinedComplexServiceNodeProvider();
          const definedNode = await customDefinedComplexServiceNodeProvider.GetCustomDefinedComplexServiceNode(regexResult[1]);
          if (definedNode != null) {
            mathNode = definedNode;
          }
        }
        return mathNode;
      }
    }

    const mathNodeCreatorProps: Partial<IMathNodeCreatorProps> = {
      Id: mathNodeId,
      EnumMathNodeType: EnumMathNodeType.Data,
      ParentNode: parentMathNode,
      Data: data,
      ComplexMathExpression: typeofData === "string" ? data : data.toString(),
      SimpleMathExpression: typeofData === "string" ? data : data.toString(),
      IsCustomNode: false,
      Description: description,
    };
    mathNode = await MathNodeOptions.CreateMathNode(mathNodeCreatorProps);
    return mathNode;
  }
  /** Convert to general tree. */
  public ConvertToGeneralTree (mathNodeRoot: IMathNode) {
    if (mathNodeRoot.Operand != null) {
      const nodeParameters = this.getNodeParametersForGeneralTree(mathNodeRoot, mathNodeRoot.Operand!);
      mathNodeRoot.OperandParameters!.addRange(nodeParameters);
    }
  }
  private getNodeParametersForGeneralTree (nodeToGetParameters: IMathNode, parentOperandDef: IOperandDefinition) {
    const newNodeParameters: IMathNode[] = [];

    if (nodeToGetParameters.Operand != null &&
              nodeToGetParameters.Operand.EnumOperandType === parentOperandDef.EnumOperandType) {
      if (nodeToGetParameters.Operand.Direction === EnumOperandDirection.LeftToRight) {
        for (let index = 0; index < nodeToGetParameters.OperandParameters!.length; index++) {
          const node = nodeToGetParameters.OperandParameters![index];

          if (node.IsParameterCountFixed || node.IsCustomNode) {
            newNodeParameters.add(node);
          } else {
            newNodeParameters.addRange(this.getNodeParametersForGeneralTree(node, parentOperandDef));
          }
        }
      }
    }

    if (newNodeParameters.length === 0) {
      newNodeParameters.add(nodeToGetParameters);
    }

    return newNodeParameters;
  }
  private getComplexMathNodeExpresstion (mathNode: IMathNode): string {
    let complexMathExpression = mathNode.ComplexMathExpression!;
    if (mathNode.EnumMathNodeType === EnumMathNodeType.Operand) {
      complexMathExpression = "";
      for (let index = 0; index < mathNode.Operand!.KeysForComplexConversion!.length; index++) {
        const keyForComplexExpression = mathNode.Operand!.KeysForComplexConversion![index];
        if (typeof keyForComplexExpression === "string") {
          complexMathExpression += keyForComplexExpression;
        } else {
          let parComplexMathExpression: string;
          if (mathNode.OperandParameters![keyForComplexExpression].IsCustomNode === true) {
            parComplexMathExpression = `«${mathNode.OperandParameters![keyForComplexExpression].Id}»`;
          } else {
            parComplexMathExpression = this.getComplexMathNodeExpresstion(mathNode.OperandParameters![keyForComplexExpression]);
          }
          complexMathExpression += parComplexMathExpression;
        }
      }
      complexMathExpression = this.groupComplextMathExpression(complexMathExpression, mathNode, mathNode.ParentNode);
    }
    return complexMathExpression;
  }
  private groupComplextMathExpression (currentExpression: string, node: IMathNode, parentNode?: IMathNode): string {
    let newExpression: string;
    if (node.EnumMathNodeType === EnumMathNodeType.Operand &&
        parentNode != null && parentNode.EnumMathNodeType === EnumMathNodeType.Operand &&
        parentNode.Operand!.Precedence < node.Operand!.Precedence) {
      newExpression = `(${currentExpression})`;
    } else {
      newExpression = currentExpression;
    }
    return newExpression;
  }

};
