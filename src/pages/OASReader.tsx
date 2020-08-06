import React, {useContext, useEffect} from 'react';
import styled from "styled-components";
import {OasContext} from "../OASProvider";
import {generateDbFromDefaultOAS} from "../OASManager";
import {ActionTypes} from "../domain/ActionTypes";


const OASReader = () => {
    const context = useContext(OasContext)
    const {dispatch} = context
    useEffect(() => {
        if (!context.db){
            generateDbFromDefaultOAS().then((database) => {
                dispatch && dispatch({
                    type: ActionTypes.INIT_DB, payload: database
                })
            })
        }else {
            dispatch && dispatch({
                type: ActionTypes.INIT_DB, payload: context.db
            })
        }
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

const OASText = () => {
    const context = useContext(OasContext)
    return <textarea
        cols={40}
        rows={30}
        defaultValue={JSON.stringify(context.prescription, undefined, 4)}
    />
}

const OASContainer = styled.div`
    height: 95vh;
`
export {OASReader};
