import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./UserStyle.css"
import KakaoSignUp from "./KakaoSignUp";

class LoginComponent extends Component {
    render() {
        return (
            <div>
                <KakaoSignUp
                    isAuthentication={this.props.isAuthentication}
                    companyAuthCheck={this.props.companyAuthCheck}
                />
            </div>
        );
    }
}
export default withRouter(LoginComponent);