import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuComponent";
import RouterComponent from "./RouterComponent";
import "./MainStyle.css"

/**
 * 메인 컴퍼넌트
 * - 슬라이드 메뉴
 * - 컨텐츠 컴퍼넌트
 */
class MainComponent extends Component {
    state = {
        isMember: true, //로그인 여부
        token: ''
    }

    authCheck = (isMember) => {
        this.setState({isMember: isMember})
    }

    render() {
        return (
            <div className="site-style">
                <Router>
                <div>
                    <MenuComponent
                        title="말.많.벙"
                        isMember={this.state.isMember}
                        authCheck={this.authCheck}
                    />

                    <div className="content-style">
                        <RouterComponent
                            isMember={this.state.isMember}
                            authCheck={this.authCheck}
                        />
                    </div>
                </div>
                </Router>
            </div>
        );
    }
}
export default MainComponent;