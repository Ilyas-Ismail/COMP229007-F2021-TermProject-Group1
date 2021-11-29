export class Survey {
    _id?: any;
    title?: string;
    userID?: string;
    questions?: string[]
    choices?: [Question[]]
}

export class Question {
    _id?: any;
    surveyID?: any;
    question?: string;
    choices?: string[]
}