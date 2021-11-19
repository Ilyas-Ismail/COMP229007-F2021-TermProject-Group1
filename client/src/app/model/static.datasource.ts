import { Injectable } from '@angular/core';
import { MC_Survey } from './mc_survey.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource
{
    private mc_surveys: MC_Survey[] =
    [
        new MC_Survey(
            '61981abe8391aab3addec518',
            'nov20test',
            [
            'firstquestion',
                'secondquestionn'
            ],
            [
                [
                    'firstchoice',
                    'secondchoice',
                    'thirdchoice'
                ],
                [
                    'firstchoice2',
                    'secondchoice2',
                    'thridchoice3'
                ]
            ])
    ];

    getMCSurveys(): Observable<MC_Survey[]>{
    return from([this.mc_surveys])
    }

}

