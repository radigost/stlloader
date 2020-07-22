import React from 'react';
import styled from "styled-components";
import {TeethCanvas} from "./TeethCanvas";
import {Navigation} from "./Navigation";
import {OASReader} from "./OASReader";
import {BrowserRouter,  Route, Switch} from "react-router-dom";
import {NavBar} from "./NavBar";
import {OASProvider} from "../OASProvider";
import {Notes} from "./Notes";

function App() {
    return (
        <AppContainer>
            <OASProvider>
                <BrowserRouter>
                    <NavBar/>
                    <PageContainer>
                        <Switch>
                            <Route path="/oas">
                                <OASReader/>
                            </Route>
                            <Route path="/stl">
                                <TeethCanvas />
                                <Navigation/>
                            </Route>
                            <Route path="/notes">
                                <Notes/>
                            </Route>
                            <Route path="/">
                                <p>This is example of Mobile Approver Prototype</p>
                            </Route>
                        </Switch>
                    </PageContainer>
                </BrowserRouter>
            </OASProvider>
        </AppContainer>
    );
}


const AppContainer = styled.div`
    text-align: center;
`

const PageContainer = styled.header`
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`


export default App;
