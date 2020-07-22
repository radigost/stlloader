import React, {useCallback, useContext, useState} from 'react';
import {OasContext} from "../OASProvider";
import {Button} from "antd-mobile";
import {ActionTypes} from "../domain/ActionTypes";

const Notes = () => {
    const context = useContext(OasContext)
    const {dispatch} = context
    const [note, setNote] = useState(context.prescription?.submissionForm.postedNotes)
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.value)
        setNote(event.target.value);
    };
    const save = useCallback(() => {
        if (dispatch) {
            dispatch({type: ActionTypes.UPDATE_NOTE, payload: note})
        }
    }, [dispatch, note])

    return (
        <div>
            <textarea
                rows={25}
                value={note}
                onChange={handleChange}
            />
            <Button onClick={save}>Save</Button>
        </div>
    );
};

export {Notes};
