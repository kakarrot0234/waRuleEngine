import { ICommonAccessPool } from "../interfaces/ICommonAccessPool";
import { EnumRuleNodeResultFoundCd } from "../enums/EnumRuleNodeResultFoundCd";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";

export interface IRuleNodeConstructor {
    Id: string;
    NodeRef?: string;
    Data?: any;
    Operand?: IOperandDefinition;
    Parent?: RuleNode;
    IsParameterCountFixed: boolean;
    IsCustomRuleNode?: boolean;
}

export abstract class RuleNode {
    NodeParameters: RuleNode[] = [];

    constructor(props: IRuleNodeConstructor) {
        this.m_Id = props.Id;
        this.m_NodeRef = props.NodeRef;
        this.m_ResultData = props.Data;
        this.m_Operand = props.Operand;
        this.m_ParentRuleNode = props.Parent;
        this.m_IsParameterCountFixed = props.IsParameterCountFixed;
        this.m_IsCustomRuleNode = props.IsCustomRuleNode;
    }

    private m_Id: string;
    public get Id() {
        return this.m_Id;
    }
    private m_NodeRef: string | undefined;
    public get NodeRef() {
        return this.m_NodeRef;
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
    private m_Operand: IOperandDefinition | undefined;
    public get Operand() {
        return this.m_Operand;
    }
    private m_ParentRuleNode: RuleNode | undefined;
    public get ParentRuleNode() {
        return this.m_ParentRuleNode;
    }
    private m_IsParameterCountFixed: boolean;
    public get IsParameterCountFixed() {
        return this.m_IsParameterCountFixed;
    }
    private m_IsCustomRuleNode: boolean | undefined;
    public get IsCustomRuleNode() {
        return this.m_IsCustomRuleNode;
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
            throw new Error(`Finding Result data of the Node that its id number is '${ruleNode.Id}' was not success!`);
        }
    }
    protected ValidatePrecenceOfResultData(ruleNode: RuleNode) {
        if (ruleNode.ResultData == null) {
            throw new Error(`Result data of the Node that its id number is '${ruleNode.Id}' was not found!`);
        }
    }
    protected ValidateTypeOfResultDataIsNumber(ruleNode: RuleNode) {
        const typeOfResultData = typeof ruleNode.ResultData;

        if (typeOfResultData !== "number") {
            throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.Id}' must be of type '${typeOfResultData}'`);
        }
    }
    protected ValidateTypeOfResultDataIsBoolean(ruleNode: RuleNode) {
        const typeOfResultData = typeof ruleNode.ResultData;

        if (typeOfResultData !== "boolean") {
            throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.Id}' must be of type '${typeOfResultData}'`);
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
            throw new Error(`Type of Result Data of Node that its id number is '${ruleNode.Id}' must be one of type from: '${acceptedTypesStr}'`);
        }
    }

}