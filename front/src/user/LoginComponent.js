import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./UserStyle.css"

class LoginComponent extends Component {
    componentDidMount() {
    }

    //회원가입 화면으로
    btnFirstOnClick = () => {
        this.props.history.push("/join")
    }

    //로그인 없이 인기 벙어리 화면으로 (상위 10줄만 보임)
    btnViewOnClick = () => {
        this.props.history.push("/popular")
    }

    //로그인 인증 요청
    btnEnterOnClick = () => {
        this.props.history.push("/access")
    }

    render() {
        return (
            <div>
                <div className="login-title">
                    로그인
                </div>
                <div className="top-button-style">
                    <button onClick={this.btnFirstOnClick}>처음이야</button>
                    <button onClick={this.btnViewOnClick}>그냥볼래</button>
                </div>
                <div className="input-area-style">
                    <div className="input-box-style">
                        <span>ID</span>
                        <input type="text"/>
                    </div>
                    <div className="input-box-style">
                        <span>PW</span>
                        <input type="text"/>
                    </div>
                </div>
                <div className="bottom-button-style">
                    <button className="button-wide-style" onClick={this.btnEnterOnClick}>들어갈래</button>
                </div>
            </div>
        );
    }
}
export default withRouter(LoginComponent);