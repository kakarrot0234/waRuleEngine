import { RuleNode, IRuleNodeConstructor } from "../interfaces/RuleNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { ICommonAccessPool } from "../interfaces/ICommonAccessPool";
import { CurrentOperandDefinitions } from "../data/CurrentOperandDefinitions";
import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";

export class RuleNodeDivide extends RuleNode {

    constructor(props: Partial<IRuleNodeConstructor>) {
        super({ NodeId: props.NodeId!, Data: props.Data, Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Divide), Parent: props.Parent });
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

                let result: number | undefined;

                await this.NodeParameters[0].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[0]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[0]);
                this.ValidateTypeOfResultDataIsNumber(this.NodeParameters[0]);
                await this.NodeParameters[1].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[1]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[1]);
                this.ValidateTypeOfResultDataIsNumber(this.NodeParameters[1]);

                if (this.NodeParameters[1].ResultData === 0) {
                    throw new Error(`Result data of the Node that its id number is '${this.NodeParameters[1].NodeId}' is 0. The divider connot be 0.!`);
                }

                result = this.NodeParameters[0].ResultData / this.NodeParameters[1].ResultData;

                for (let index = 2; index < this.NodeParameters.length; index++) {
                    const nodeParameter = this.NodeParameters[index];
                    await nodeParameter.FindResultData(commonAccessPool);
                    this.ValidateFindingResultIsSuccess(nodeParameter);
                    this.ValidatePrecenceOfResultData(nodeParameter);
                    this.ValidateTypeOfResultDataIsNumber(nodeParameter);

                    if (nodeParameter.ResultData === 0) {
                        throw Error(`Result data of the Node that its id number is '${nodeParameter.NodeId}' is 0. The divider connot be 0.!`);
                    }

                    result = result / nodeParameter.ResultData;
                }

                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
}