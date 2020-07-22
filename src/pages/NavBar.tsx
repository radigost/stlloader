import React, {useCallback} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {TabBar} from "antd-mobile";

const NavBar = () => {
    const history = useHistory();
    const location = useLocation()
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
                    background: 'url(static/media/Prescription.svg) center center /  21px 21px no-repeat'
                }}
                />
                }
                selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(static/media/Prescription.svg) center center /  21px 21px no-repeat'
                }}
                />
                }
                selected={location.pathname === '/oas'}
                onPress={() => go("/oas")}
                data-seed="logId"
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
                title="STL"
                key="STL"
                selected={location.pathname === '/stl'}
                onPress={() => go("/stl")}
                data-seed="logId1"
            >
            </TabBar.Item>
            <TabBar.Item
                icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(static/media/notes.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(static/media/notes.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                }
                title="Notes"
                key="Notes"
                selected={location.pathname === '/notes'}
                onPress={() => go("/notes")}
                data-seed="logId1"
            >
            </TabBar.Item>
        </TabBar>
    );
};

export {NavBar};
