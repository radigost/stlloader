import React, {useReducer} from "react";
import {OASState} from "./domain/OASState";
import {getCaseId, getPrescription, updateNotes} from "./Statements";
import {ActionTypes} from "./domain/ActionTypes";

const initialState = {
    loading: false,
    db: undefined,
    prescription: undefined,
    caseId: undefined,
    dispatch: undefined
}


const OasContext = React.createContext<OASState>(initialState);

const OASProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer((state: OASState, action: any) => {
        let newState = state
        switch (action.type) {
            case ActionTypes.INIT_DB:
                try {
                    const database = action.payload
                    newState = {
                        ...state, db: database,
                        prescription: getPrescription(database),
                        loading: false,
                        caseId: getCaseId(database)
                    }
                } catch (e) {
                    console.error(e.message)
                }
                break
            case ActionTypes.UPDATE_NOTE:
                updateNotes(state.db, action.payload)
                break
            default:
                throw new Error();
        }
        return newState
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


export {OasContext, OASProvider}
