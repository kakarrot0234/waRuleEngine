import { ICustomDefinedComplexServiceNode } from "../interfaces/ICustomDefinedComplexServiceNode";

export class CustomDefinedComplexServiceNodeProvider {
    private m_CustomDefinedComplexServiceNodes: ICustomDefinedComplexServiceNode[] = [];

    GetCustomDefinedComplexServiceNode(...ids: string[]): ICustomDefinedComplexServiceNode[] {
        const nodes = this.m_CustomDefinedComplexServiceNodes.filter((o) => {
            return ids.includes(o.Id!);
        });
        return nodes;
    }
    SaveCustomDefinedCompexServiceNodes(...nodes: ICustomDefinedComplexServiceNode[]){
        nodes.forEach(node => {
            const thereIsNodeWithSameId = this.m_CustomDefinedComplexServiceNodes.find((o) => {
                return o.Id === node.Id;
            }) != null;

            if (thereIsNodeWithSameId) {
                this.UpdateCustomDefinedCompexServiceNode(node);
            } else{
                this.m_CustomDefinedComplexServiceNodes.push({
                    Guid: node.Guid,
                    ParentRef: node.ParentRef,
                    Id: node.Id,
                    OperandRef: node.OperandRef,
                    OperandLeftPar: node.OperandLeftPar,
                    OperandRightPar: node.OperandRightPar,
                    Data: node.Data,
                    Description: node.Description,
                });
            }
        });
    }
    UpdateCustomDefinedCompexServiceNode(node: ICustomDefinedComplexServiceNode) {
        const currentNode = this.m_CustomDefinedComplexServiceNodes.find((o) => {
            return o.Id === node.Id;
        });
        if (currentNode != null) {
            currentNode.Data = node.Data;
            currentNode.Description = node.Description;
            currentNode.OperandLeftPar = node.OperandLeftPar;
            currentNode.OperandRef = node.OperandRef;
            currentNode.OperandRightPar = node.OperandRightPar;
            currentNode.ParentRef = node.ParentRef;    
        }
    }
}