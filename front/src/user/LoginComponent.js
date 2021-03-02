import React, { Component } from 'react';
import "./UserStyle.css"
class LoginComponent extends Component {
    componentDidMount() {
    }

    btnFirstOnClick = () => {
        console.log("처음이야 클릭!")
        //회원가입 화면으로
    }
    btnViewOnClick = () => {
        console.log("그냥볼래 클릭!")
        //인기 벙어리 화면으로
    }
    btnEnterOnClick = () => {
        console.log("들어갈래 클릭!")
        //로그인 인증 요청
    }
    render() {
        return (
            <div>
                <div className="login-title">
                    로그인
                </div>
                <div>
                    <button onClick={this.btnFirstOnClick}>처음이야</button>
                    <button onClick={this.btnViewOnClick}>그냥볼래</button>
                </div>
                <div>
                    <div>
                        <span>ID</span>
                        <input type="text"/>
                    </div>
                    <div>
                        <span>PW</span>
                        <input type="text"/>
                    </div>
                </div>
                <div>
                    <button onClick={this.btnEnterOnClick}>들어갈래</button>
                </div>
            </div>
        );
    }
}
export default LoginComponent;