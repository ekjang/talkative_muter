import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./UserStyle.css"

class LoginComponent extends Component {
    componentDidMount() {
    }

    //회원가입 화면으로
    btnFirstOnClick = () => {
        this.props.history.push("/companyAuth")
    }

    //로그인 없이 인기 벙어리 화면으로 (상위 10줄만 보임)
    btnViewOnClick = () => {
        this.props.history.push("/popular")
    }

    //로그인 인증 요청
    btnEnterOnClick = () => {
        //axios.post
        //로그인 성공 시
        //회원 정보 => token
        this.props.isMemberCheck(true)

        this.props.companyAuthCheck(true)
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <div className="user-package-title">
                    로그인
                </div>
                <div className="top-button-style">
                    <button className="first-button" onClick={this.btnFirstOnClick}>처음이야</button>
                    <button className="just-button" onClick={this.btnViewOnClick}>그냥볼래</button>
                </div>
                <div className="input-area-style">
                    <div className="input-box-style">
                        <span>회원아이디</span>
                        <input className="input-box" type="text"/>
                    </div>
                    <div className="input-box-style">
                        <span>비 밀 번 호</span>
                        <input className="input-box" type="text"/>
                    </div>
                </div>
                <div className="bottom-button-style">
                    <button className="enter-button" onClick={this.btnEnterOnClick}>들어갈래</button>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginComponent);