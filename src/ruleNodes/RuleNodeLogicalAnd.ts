import { RuleNode, IRuleNodeConstructor } from '../helpers/RuleNode';
import { CurrentOperandDefinitions } from '../data/CurrentOperandDefinitions';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';
import { IIsValidResult } from '../interfaces/IIsValidResult';
import { ICommonAccessPool } from '../interfaces/ICommonAccessPool';

export class RuleNodeLogicalAnd extends RuleNode {
    constructor(props: Partial<IRuleNodeConstructor>) {
        super({
            Id: props.Id!,
            NodeRef: props.NodeRef,
            Data: props.Data,
            Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.LogicalAnd),
            Parent: props.Parent,
            IsParameterCountFixed: false,
            IsCustomRuleNode: props.IsCustomRuleNode,
        });
    }

    IsValid(): IIsValidResult {
        if (this.NodeParameters == null || this.NodeParameters.length < 2) {
            return { IsValid: false, Message: "There must be at least 2 parameters." };
        }

        return { IsValid: true };
    };
    SelfFindResultData(commonAccessPool: ICommonAccessPool): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const isValid = this.IsValid();

                if (!isValid.IsValid) {
                    throw `To get the results, you should fix the following problems. ${isValid.Message}`
                }


                let result: boolean;

                for (let index = 0; index < this.NodeParameters.length; index++) {
                    const ruleNode = this.NodeParameters[index];
                    await ruleNode.FindResultData(commonAccessPool);
                    this.ValidateFindingResultIsSuccess(ruleNode);
                    this.ValidatePrecenceOfResultData(ruleNode);
                    this.ValidateTypeOfResultDataIsBoolean(ruleNode);
                    result = ruleNode.ResultData;

                    if (result === false) {
                        break;
                    }
                }

                return resolve(result!);
            } catch (error) {
                return reject(error);
            }
        });
    };
}