import { ICommonAccessPool } from "./ICommonAccessPool";
import { EnumRuleNodeResultFoundCd } from "../enums/EnumRuleNodeResultFoundCd";
import { IIsValidResult } from "./IIsValidResult";
import { IOperandDefinition } from "./IOperandDefinition";

export abstract class RuleNode {
    NodeParameters: RuleNode[] = [];

    constructor(nodeId: string, data?: any, operand?: Partial<IOperandDefinition>) {
        this.m_NodeId = nodeId;
        this.m_ResultData = data;
        this.m_Operand = operand;
    }

    private m_NodeId: string;
    public get NodeId() {
        return this.m_NodeId;
    }
    private m_ResultFoundCd = EnumRuleNodeResultFoundCd.NotFoundYet;
    public get ResultFoundCd() {
        return this.m_ResultFoundCd;
    }
    private m_ResultData: any | undefined;
    public get ResultData() {
        return this.m_ResultData;
    }
    private m_Error: any | undefined;
    public get Error() {
        return this.m_Error;
    }
    private m_Operand: Partial<IOperandDefinition> | undefined;
    public get Operand() {
        return this.m_Operand;
    }

    public IsValid(): IIsValidResult {
        return { IsValid: true, };
    }
    public FindResultData(commonAccessPool?: ICommonAccessPool): Promise<void> {
        return new Promise<any>(async (resolve) => {
            try {
                this.m_ResultData = await this.SelfFindResultData(commonAccessPool);
                this.m_ResultFoundCd = EnumRuleNodeResultFoundCd.Found;
                return resolve();
            } catch (error) {
                this.m_ResultFoundCd = EnumRuleNodeResultFoundCd.Error;
                this.m_Error = error;
                return resolve();
            }
        });
    }
    protected abstract SelfFindResultData(commonAccessPool?: ICommonAccessPool): Promise<any>;
    protected ValidateFindingResultIsSuccess(ruleNode: RuleNode) {
        if (ruleNode.ResultData == null) {
            throw new Error(`Finding Result data of the Node that its id number is '${ruleNode.NodeId}' was not success!`);
        }
    }
    protected ValidatePrecenceOfResultData(ruleNode: RuleNode) {
        if (ruleNode.ResultData == null) {
            throw new Error(`Result data of the Node that its id number is '${ruleNode.NodeId}' was not found!`);
        }
    }
    protected ValidateTypeOfResultDataIsNumber(ruleNode: RuleNode) {
        const typeOfResultData = typeof ruleNode.ResultData;

        if (typeOfResultData !== "number") {
            throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.NodeId}' must be of type '${typeOfResultData}'`);
        }
    }
    protected ValidateTypeOfResultDataIsBoolean(ruleNode: RuleNode) {
        const typeOfResultData = typeof ruleNode.ResultData;

        if (typeOfResultData !== "boolean") {
            throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.NodeId}' must be of type '${typeOfResultData}'`);
        }
    }
    protected ValidateTypeOfResultDataIsAcceptable(listOfAcceptedTypes: string[], ruleNode: RuleNode) {
        const typeOfResultData = typeof ruleNode.ResultData;

        if (!listOfAcceptedTypes.includes(typeOfResultData)) {
            let acceptedTypesStr = "";

            for (let index = 0; index < listOfAcceptedTypes.length; index++) {
                const acceptedType = listOfAcceptedTypes[index];
                
                if (index === listOfAcceptedTypes.length - 1) {
                    acceptedTypesStr += acceptedType;
                } else {
                    acceptedTypesStr += `${acceptedType}, `;
                }
            }
            throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.NodeId}' must be one of type from: '${acceptedTypesStr}'`);
        }
    }

}