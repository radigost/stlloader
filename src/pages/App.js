import React from 'react';
import styled from "styled-components";
import {TeethCanvas} from "./TeethCanvas";
import {Navigation} from "./Navigation";
import {OASReader} from "./OASReader";

function App() {
    return (
        <AppContainer>
            <AppHeader>
                <OASReader/>

                <Navigation/>
            </AppHeader>
        </AppContainer>
    );
}


const AppContainer = styled.div`
    text-align: center;
`

const AppHeader = styled.header`
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`



export default App;
