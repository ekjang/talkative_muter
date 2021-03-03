import React, { Component } from "react";
import {withRouter} from "react-router-dom";

class CompanyAuthComponent extends Component {

    transfer = () => {
        //입력한 메일 주소로 인증코드 요청
        //axios.get
    }

    accessCodeCheck = () => {
        //인증코드 체크 후 성공 시 회원가입 화면으로
        this.props.history.push("/join")
    }

    render() {
        return (
            <div>
                <div className="user-package-title">
                    회사메일 인증
                </div>
                <div>
                    <input type="text" />@datastreams.co.kr
                    <button onClick={this.transfer} >전송</button>
                </div>
                <div className="user-package-title">
                    인증코드 입력
                </div>
                <div>
                    <input type="text" />
                    <button onClick={this.accessCodeCheck} >확인</button>
                </div>
            </div>
        );
    }    
}

export default withRouter(CompanyAuthComponent);