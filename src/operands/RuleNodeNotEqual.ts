import { RuleNode } from "../interfaces/RuleNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";
import { ICommonAccessPool } from "../interfaces/ICommonAccessPool";

export class RuleNodeNotEqual extends RuleNode {

    constructor(nodeId: string) {
        super(nodeId);
    }

    IsValid(): IIsValidResult {
        if (this.NodeParameters == null || this.NodeParameters.length !== 2) {
            return { IsValid: false, Message: "There must be 1 parameter for left and right side!" };
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
                const leftSideResult = this.NodeParameters[0].ResultData;
                await this.NodeParameters[1].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[1]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[1]);
                const rightSideResult = this.NodeParameters[1].ResultData;
                const result = leftSideResult !== rightSideResult;
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
}