import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuComponent";
import RouterComponent from "./RouterComponent";
import "./MainStyle.css"
import BottomTextComponent from "./BottomTextComponent";

/**
 * 메인 컴퍼넌트
 * - 슬라이드 메뉴
 * - 컨텐츠 컴퍼넌트
 */
class MainComponent extends Component {
    state = {
        today: new Date().toISOString().substr(0, 10),
        // isMember: false, //로그인 여부
        // token: false, //유저 정보
        isAuthentication: false, //회사 인증 여부
    }

    componentDidMount() {
        let date = new Date().toISOString().substr(0, 10)
        this.setState({isAuthentication: localStorage.getItem('isAuthentication')
            , today: date})
    }

    companyAuthCheck = (isAuthentication) => {
        this.setState({isAuthentication: isAuthentication})
        localStorage.setItem('isAuthentication', JSON.stringify(isAuthentication))
    }

    render() {
        return (
            <div className="site-style">
                <Router>
                <div>
                    <MenuComponent
                        /* title="말.많.벙" */
                        today={this.state.today}
                        isAuthentication={this.state.isAuthentication}
                    />

                    <div className="content-style">
                        <RouterComponent
                            today={this.state.today}
                            isAuthentication={this.state.isAuthentication}
                            companyAuthCheck={this.companyAuthCheck}
                        />
                    </div>
                </div>
                </Router>
                <BottomTextComponent />
            </div>
        );
    }
}
export default MainComponent;