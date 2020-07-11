import React, {Dispatch, DispatchWithoutAction, useReducer, useState} from "react";

const getPrescription = (db: any) => {
    const treatments = db.prepare("SELECT * FROM 'TREATMENT_PRESCRIPTION'");
    let prescription
    while (treatments.step()) { //
        const row = treatments.getAsObject();
        prescription = JSON.parse(row.PrescriptionStr)
    }
    treatments.free()
    return prescription
}
const getCaseId = (db: any) => {
    const stmt = db.prepare("SELECT * FROM 'CASES'");
    let caseId
    while (stmt.step()) { //
        const row = stmt.getAsObject();
        caseId = row.CASEID
    }
    stmt.free();
    return caseId
}
const get3dModel = (db: any) => {
    const stmt = db.prepare("select * from ASSEMBLIES_ZIP where ID=0");
    let model
    while (stmt.step()) { //
        const row = stmt.getAsObject();
        model = row.UnsegmentedData
    }
    stmt.free();
    console.log({model})
    return model
}


enum ActionTypes {
    'INIT_DB' = 'INIT_DB'
}

const initialState = {
    loading: false,
    db: undefined,
    prescription: undefined,
    caseId: undefined,
    dispatch: undefined
}

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
}

const OasContext = React.createContext<OASState>(initialState);

const OASProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer((state: OASState, action: any) => {
        switch (action.type) {
            case ActionTypes.INIT_DB:
                try {
                    const database = action.payload
                    const newState = {
                        ...state, db: database,
                        prescription: getPrescription(database),
                        loading: false,
                        caseId: getCaseId(database)
                    }
                    return newState;
                } catch (e) {
                    console.error(e.message)
                }
            default:
                throw new Error();
        }
        ;
    }, initialState);
    return (
        <OasContext.Provider
            value={{
                ...state,
                dispatch
            }}>
            {children}
        </OasContext.Provider>
    )
}


export {OasContext, OASProvider, ActionTypes}
