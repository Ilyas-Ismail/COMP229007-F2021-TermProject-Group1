export class Survey {
    _id?: any;
    Title?: string;
    Username?: string;
    Time?: number;
    Questions?: string[]
    Choices?: [string[]]
}

export class Survey_qc {
    _id?: any;
    SurveyID?: any;
    Question?: string;
    Choices?: string[]
}