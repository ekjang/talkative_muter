import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./UserStyle.css"
import KakaoSignUp from "./KakaoSignUp";

class LoginComponent extends Component {

    companyAuthCheck = (check) => {
        if(check) {
            this.props.companyAuthCheck(check)
            this.props.history.push("/")
        } else {
            alert("회사 메일인증이 필요합니다.")
            this.props.history.push("/companyAuth")
        }
    }

    render() {
        return (
            <div>
                <KakaoSignUp
                    isAuthentication={this.props.isAuthentication}
                    companyAuthCheck={this.companyAuthCheck}
                />
            </div>
        );
    }
}
export default withRouter(LoginComponent);