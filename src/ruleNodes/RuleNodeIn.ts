import { CurrentOperandDefinitions } from "../data/CurrentOperandDefinitions";
import { EnumRuleNodeType } from "../enums/EnumRuleNodeType";
import { IRuleNodeConstructor, RuleNode } from "../helpers/RuleNode";
import { ICommonAccessPool } from "../interfaces/ICommonAccessPool";
import { IIsValidResult } from "../interfaces/IIsValidResult";

export class RuleNodeIn extends RuleNode {

    constructor(props: Partial<IRuleNodeConstructor>) {
        super({
            Id: props.Id!,
            NodeRef: props.NodeRef,
            Data: props.Data,
            Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.In),
            Parent: props.Parent,
            IsParameterCountFixed: true,
            IsCustomRuleNode: props.IsCustomRuleNode,
        });
    }

    IsValid(): IIsValidResult {
        if (this.NodeParameters == null || this.NodeParameters.length < 2) {
            return { IsValid: false, Message: "There must be 2 parameter." };
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

                let result: boolean | undefined;

                await this.NodeParameters[0].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[0]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[0]);
                await this.NodeParameters[1].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[1]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[1]);

                const listOfIn: any[] = [];
                const typeOfInPar = typeof this.NodeParameters[1].ResultData;
                console.log(typeOfInPar);
                if (typeOfInPar === "string") {
                    const strArray = (<string>this.NodeParameters[1].ResultData).split(/,/gu);
                    strArray.forEach((o) => {
                        listOfIn.push(o);
                    });
                } else if (typeOfInPar === "object") {
                    const objArray = this.NodeParameters[1].ResultData as any[];
                    if (objArray != null) {
                        objArray.forEach((o) => {
                            listOfIn.push(o);
                        });
                    } else {
                        listOfIn.push(this.NodeParameters[1].ResultData);
                    }
                } else {
                    listOfIn.push(this.NodeParameters[1].ResultData);
                }

                result = listOfIn.findIndex((o) => {
                    return o === this.NodeParameters[0].ResultData;
                }) >= 0;

                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    }
}