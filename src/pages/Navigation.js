import React from 'react';
import styled from "styled-components";
import {Button} from "antd-mobile";

const Navigation = () => {
    return (
            <AppUi>
                <AppUiButton>&larr;</AppUiButton>
                <div>stages</div>
                <AppUiButton>&rarr;</AppUiButton>
                <div>arch filter</div>
                <div>view shortcut</div>
                <AppUiButton>Approve</AppUiButton>
            </AppUi>
    );
};

const AppUi = styled.div`
    height: 20vh;
    width: 100%;
    background-color: #70e1e1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: aliceblue;
`

const AppUiButton = styled(Button)`
    width: 20%;
    font-size: xx-large;
`

export {Navigation};
