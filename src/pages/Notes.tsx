import React, {useContext} from 'react';
import {OasContext} from "../OASProvider";
import {Button} from "antd-mobile";

const Notes = () => {
    const context = useContext(OasContext)
    console.log(context.prescription?.submissionForm.postedNotes)
    return (
        <div>
            <textarea
                cols={40}
                rows={20}
                defaultValue={context.prescription?.submissionForm?.postedNotes}
            />
            <Button>Save</Button>
        </div>
    );
};

export {Notes};
