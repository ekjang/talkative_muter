import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./UserStyle.css"

class JoinComponent extends Component {
    btnOkOnClick = () => {
        console.log("확인 버튼")
        //axios.post
    }

    btnNoOnClick = () => {
        console.log("취소 버튼")
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
                <div className="user-package-title">
                    회원가입
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
                    <div className="input-box-style">
                        <span>PW check</span>
                        <input type="text"/>
                    </div>
                </div>
                <div className="bottom-button-style">
                    <button className="button-wide-style" onClick={this.btnOkOnClick}>확인</button>
                    <button className="button-wide-style" onClick={this.btnNoOnClick}>취소</button>
                </div>
            </div>
        );
    }
}
export default withRouter(JoinComponent);