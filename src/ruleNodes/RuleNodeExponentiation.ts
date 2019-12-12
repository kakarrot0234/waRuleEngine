import { RuleNode, IRuleNodeConstructor } from '../helpers/RuleNode';
import { CurrentOperandDefinitions } from '../data/CurrentOperandDefinitions';
import { EnumRuleNodeType } from '../enums/EnumRuleNodeType';
import { IIsValidResult } from '../interfaces/IIsValidResult';
import { ICommonAccessPool } from '../interfaces/ICommonAccessPool';

export class RuleNodeExponentiation extends RuleNode {
    constructor(props: Partial<IRuleNodeConstructor>) {
        super({
            Id: props.Id!,
            NodeRef: props.NodeRef,
            Data: props.Data,
            Operand: CurrentOperandDefinitions.FindOperandDefinitions(EnumRuleNodeType.Exponentiation),
            Parent: props.Parent,
            IsParameterCountFixed: true,
            IsCustomRuleNode: props.IsCustomRuleNode,
        });
    }

    IsValid(): IIsValidResult {
        if (this.NodeParameters == null || this.NodeParameters.length !== 2) {
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

                await this.NodeParameters[0].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[0]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[0]);
                this.ValidateTypeOfResultDataIsNumber(this.NodeParameters[0]);
                const x: number = this.NodeParameters[0].ResultData;

                await this.NodeParameters[1].FindResultData(commonAccessPool);
                this.ValidateFindingResultIsSuccess(this.NodeParameters[1]);
                this.ValidatePrecenceOfResultData(this.NodeParameters[1]);
                this.ValidateTypeOfResultDataIsNumber(this.NodeParameters[1]);
                const y: number = this.NodeParameters[1].ResultData;
                const result = Math.pow(x, y);

                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        });
    };
}