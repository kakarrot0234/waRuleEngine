import { RuleNode, IRuleNodeConstructor, } from "../helpers/RuleNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { ICommonAccessPool } from "../interfaces/ICommonAccessPool";
import { CurrentOperandDefinitions } from "../data/CurrentOperandDefinitions";
import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";

export class RuleNodeBiggerOrEqualThan extends RuleNode {

    constructor(props: Partial<IRuleNodeConstructor>) {
        super({
            NodeId: props.NodeId!,
            Data: props.Data,
            Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.BiggerOrEqualThan),
            Parent: props.Parent,
            IsParameterCountFixed: true,
        });
    }

    IsValid(): IIsValidResult {
        if (this.NodeParameters == null || this.NodeParameters.length < 2) {
            return { IsValid: false, Message: "There must be at least 2 parameter." };
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

                await this.NodeParameters[0].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[0]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[0]);
                await this.NodeParameters[1].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[1]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[1]);
                const leftSideResult = this.NodeParameters[0].ResultData;
                const rightSideResult = this.NodeParameters[1].ResultData;
                const result = leftSideResult >= rightSideResult;
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
}