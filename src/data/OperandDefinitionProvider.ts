import { IOperandDefinition } from "../interfaces/IOperandDefinition";
import { CurrentOperandDefinitions } from "./CurrentOperandDefinitions";

export class OperandDefinitionProvider {
    GetAllOperandDefinitions(): IOperandDefinition[] {
        const operandDefinitions: IOperandDefinition[] = CurrentOperandDefinitions.OperandDefinitions;
        return operandDefinitions;
    }
}