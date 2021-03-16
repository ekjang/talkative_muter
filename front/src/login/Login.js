import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./UserStyle.css"
import KakaoSignUp from "./KakaoSignUp";

/**
 * 로그인 화면
 */
class Login extends Component {

    /**
     * 카카오 로그인, 회사 메일인증 체크 함수
     * @param isAuth
     */
    loginCheck = (isAuth) => {
        if(isAuth) {
            this.props.loginCheck(isAuth, '')
            this.props.history.push("/")
        } else {
            alert("회사 메일인증이 필요합니다.")
            //회사 메일인증 코드 발송 화면으로
            this.props.history.push("/mailAuth")
        }
    }

    render() {
        return (
            <div className="kakao">
                <div >
                    <div className="kakaologin"> 
                <KakaoSignUp
                    isAuth={this.props.isAuth}
                    loginCheck={this.loginCheck}
                />
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);