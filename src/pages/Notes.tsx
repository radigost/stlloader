import React, {useContext} from 'react';
import {OasContext} from "../OASProvider";

const Notes = () => {
    const context = useContext(OasContext)
    console.log(context.prescription?.submissionForm.postedNotes)
    return (
        <div>
            {context.prescription?.submissionForm?.postedNotes}
        </div>
    );
};

export {Notes};
