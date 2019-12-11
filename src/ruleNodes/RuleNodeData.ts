import { RuleNode, IRuleNodeConstructor } from "../helpers/RuleNode";
import { IIsValidResult } from "../interfaces/IIsValidResult";

export class RuleNodeData extends RuleNode {
    constructor(props: Partial<IRuleNodeConstructor>) {
        super({
            NodeId: props.NodeId!,
            Data: props.Data,
            Parent: props.Parent,
            IsParameterCountFixed: true,
        });
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