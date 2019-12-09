import { RuleNode } from "../interfaces/RuleNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";

export class RuleNodeData extends RuleNode {
    constructor(nodeId: string, data?: any) {
        super(nodeId, data);
    }

    IsValid(): IIsValidResult {
        if (this.ResultData == null) {
            return { IsValid: false, Message: "For RuleNode of type Data, there must be a Result Data!", };
        }

        return { IsValid: true, };
    };

    SelfFindResultData(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                const isValid = this.IsValid();

                if (!isValid.IsValid) {
                    throw `To get the results, you should fix the following problems. ${isValid.Message}`
                }

                return resolve(this.ResultData);
            } catch (error) {
                return reject(error);
            }
        })
    }
}