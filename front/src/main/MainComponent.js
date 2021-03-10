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
        isMember: false, //로그인 여부
        token: false, //유저 정보
        isAuthentication: false //회사 인증 여부
    }

    componentDidMount() {
        this.setState({isMember: localStorage.getItem('isMember')
            , token: localStorage.getItem('token')
            , isAuthentication: localStorage.getItem('isAuthentication')})
    }

    isMemberCheck = (isMember) => {
        this.setState({isMember: isMember})
        localStorage.setItem('isMember', JSON.stringify(isMember))
    }

    companyAuthCheck = (isAuthentication) => {
        this.setState({isAuthentication: isAuthentication})
        localStorage.setItem('isAuthentication', JSON.stringify(isAuthentication))
    }

    render() {
        console.log("render")
        return (
            <div className="site-style">
                <Router>
                <div>
                    <MenuComponent
                        title="말.많.벙"
                        isMember={this.state.isMember}
                        token={this.state.token}
                        isAuthentication={this.state.isAuthentication}
                    />

                    <div className="content-style">
                        <RouterComponent
                            isMember={this.state.isMember}
                            token={this.state.token}
                            isAuthentication={this.state.isAuthentication}
                            isMemberCheck={this.isMemberCheck}
                            companyAuthCheck={this.companyAuthCheck}
                        />
                    </div>
                </div>
                </Router>
            </div>
        );
    }
}
export default MainComponent;