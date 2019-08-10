export enum CriteriaType {
    Numeric,
    AlphaNumeric,
    Date
};

export class Criteria {
    Id: string;
    Name: string;
    Type: CriteriaType;
};