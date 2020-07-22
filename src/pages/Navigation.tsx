import React, {useState} from 'react';
import styled from "styled-components";
import {Button, Flex} from "antd-mobile";
import FlexItem from "antd-mobile/es/flex/FlexItem";

const size = 45
const Navigation = () => {
    const [current, setCurrent] = useState(1)
    return (
        <AppUi>
            <StagesContainer>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <Stage active={num === current} key={num}>{num}</Stage>)}
            </StagesContainer>
            <ArchesContainer>
                <ButtonWrapper><img alt="top" src="static/media/top.png" height={size} width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="bottom" src="static/media/bottom.png" height={size}
                                    width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="both" src="static/media/both.png" height={size} width={size}/></ButtonWrapper>
            </ArchesContainer>
            <ViewsContainer>
                <ButtonWrapper><img alt="top" src="static/media/top.png" height={size} width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="bottom" src="static/media/bottom.png" height={size}
                                    width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="both" src="static/media/both.png" height={size} width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="left" src="static/media/left.png" height={size} width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="right" src="static/media/right.png" height={size}
                                    width={size}/></ButtonWrapper>
                <ButtonWrapper><img alt="back" src="static/media/back.png" height={size} width={size}/></ButtonWrapper>
            </ViewsContainer>
            <ArrowsContainer>
                <FlexItem>
                    <Button onClick={() => current > 1 && setCurrent(current - 1)}>&larr;</Button>
                </FlexItem>
                <FlexItem>
                    <Button onClick={() => current < 10 && setCurrent(current + 1)}>&rarr;</Button>
                </FlexItem>
            </ArrowsContainer>
            <Button>Approve</Button>
        </AppUi>
    );
};

const Stage = styled.div<{ active: boolean }>`
  padding: 10px;
  background-color: ${({active}) => active ? 'white' : '#70e1e1'};
  color: ${({active}) => active ? '#70e1e1' : 'white'};
`
const ButtonWrapper = styled.div`
  padding: 2px;
`
const ArrowsContainer = styled(Flex)`
  margin-bottom: 2px;
`
const ViewsContainer = styled.div`
  position: absolute;
  top: 55px;
  right: 0px;
  display: flex;
  flex-direction: row;
  padding-right: 10px;
  
`

const ArchesContainer = styled.div`
    position: absolute;
    bottom: 155px;
    display: flex;
    flex-direction: row;
`
const StagesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 2px;
`

const AppUi = styled.div`
    height: 20vh;
    width: 100%;
    z-index: 1;
    background-color: #70e1e1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: aliceblue;
`

export {Navigation};
