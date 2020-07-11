import React, { useContext, useEffect} from 'react';
import styled from "styled-components";
import {ActionTypes, OasContext, OASProvider} from "../OASProvider";
import {generateDbFromDefaultOAS} from "../OASManager";



const OASReader = () => {
    const context = useContext(OasContext)
    const {dispatch} = context
    useEffect(() => {
        generateDbFromDefaultOAS().then((database) => {
            dispatch && dispatch({type: ActionTypes.INIT_DB, payload: database})
        })
    }, [dispatch])


    return <OASContainer>
        {context.loading ?
            <div>Loading...</div> :
            <div>
                <h5>case id '{context.caseId}'</h5>
                <OASText/>
            </div>
        }
    </OASContainer>
};

const OASText = ({}) => {
    const context = useContext(OasContext)
    return <textarea
        cols={40}
        rows={20}
        defaultValue={JSON.stringify(context.prescription, undefined, 4)}
    />
}

const OASContainer = styled.div`
    height: 80vh;
`
export {OASReader};
