import {Dispatch} from "react";
import {ActionTypes} from "./ActionTypes";
import {SqlJs} from "sql.js/module";

interface Prescription {
    submissionForm: {
        postedNotes: string
    }
}

interface OASState {
    loading: boolean,
    dispatch?: Dispatch<{ type: ActionTypes, payload: any }>
    caseId?: string
    prescription?: Prescription
    db?: SqlJs.Database
}


export type {OASState};
