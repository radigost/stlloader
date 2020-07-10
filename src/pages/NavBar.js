import React, {useCallback} from 'react';
import {BrowserRouter, Link, useHistory} from "react-router-dom";
import {Flex, TabBar} from "antd-mobile";
import FlexItem from "antd-mobile/es/flex/FlexItem";

const NavBar = () => {
    const history = useHistory();
    const go = useCallback((route) => {
        if (history) {
            history.push(route)
        }
    }, [history])
    return (
        <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            // hidden={this.state.hidden}
            tabBarPosition="top"
        >
            <TabBar.Item
                title="Prescription"
                key="Prescription"
                icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                }}
                />
                }
                // selected={this.state.selectedTab === 'blueTab'}
                onPress={() => go("/oas")}
                data-seed="logId"
            >
                {/*<Link to="/oas">Prescription</Link>*/}
                {/*{this.renderContent('Life')}*/}
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                title="STL"
                key="STL"
                // selected={this.state.selectedTab === 'redTab'}
                onPress={() => go("/stl")}
                data-seed="logId1"
            >
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                title="Photo"
                key="Photo"
                // selected={this.state.selectedTab === 'redTab'}
                onPress={() => go("/stl")}
                data-seed="logId1"
            >
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                title="Notes"
                key="Notes"
                // selected={this.state.selectedTab === 'redTab'}
                onPress={() => go("/stl")}
                data-seed="logId1"
            >
            </TabBar.Item>
        </TabBar>
    );
};

export {NavBar};
