import React, {useCallback} from 'react';
import styled from "styled-components";
import {TeethCanvas} from "./TeethCanvas";
import {Navigation} from "./Navigation";
import {OASReader} from "./OASReader";
import {BrowserRouter, Link, useHistory, Route, Switch} from "react-router-dom";
import {NavBar} from "./NavBar";

function App() {



    return (
        <AppContainer>
            <BrowserRouter>
                <NavBar/>
                <AppHeader>
                    <Switch>
                        <Route path="/oas">
                            <OASReader/>
                        </Route>
                        <Route path="/stl">
                            <TeethCanvas model={true}/>
                            <Navigation/>
                        </Route>
                        <Route path="/">
                            <p>This is example of Mobile Approver Prototype</p>
                        </Route>
                    </Switch>
                </AppHeader>
            </BrowserRouter>
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
