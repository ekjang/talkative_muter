import React, { Component } from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import server_url from "../define/Url"
import "./UserStyle.css"

/**
 * 회사메일 인증코드 전송 화면
 */
class CompanyAuthComponent extends Component {

    state = {
        companyId: '',
        mailPath: '@datastreams.co.kr',
        authCode: 'A2cgw4!', /////test :A2cgw4!
        inputAuthCode: '',
        isAuthentication: false

    }

    inputHandler = (e) => {
        this.setState({companyId: e.target.value})
    }

    //취소 버튼 클릭
    btnNoOnClick = () => {
        this.props.history.push("/")
    }

    //메일 인증코드 전송
    transfer = () => {
        if(this.state.companyId === '') {
            alert("아이디를 입력하세요.")
        } else {
            let mail = this.state.companyId + this.state.mailPath
            axios.post(server_url + "/mail/check", {mail: mail})
                .then(res => {
                    console.log(res.data.authCode)
                    //서버에서 생성한 인증코드 받기
                    this.setState({authCode: res.data.authCode})
                })
                .catch(res => console.log(res))
            alert("인증번호가 전송되었습니다.")
        }
    }

    //인증코드 체크
    authCodeCheck = (e) => {
        this.setState({inputAuthCode: e.target.value})
        if(this.state.authCode === e.target.value) {
            this.setState({isAuthentication: true})
        } else {
            this.setState({isAuthentication: false})
        }
    }

    //회원가입 화면으로
    goToJoin = () => {
        if(!this.state.isAuthentication) {
            alert("인증되지 않았습니다.")
        } else {
            //인증코드 체크 후 성공 시 회원가입 화면으로
            this.props.history.push("/join")
        }
    }

    render() {
        return (
            <div>
                <div className="user-package-title">
                    회사메일 인증
                </div>
                <div>
                    <input type="text" value={this.state.companyId} onChange={this.inputHandler}/>{this.state.mailPath}
                    <button onClick={this.transfer} >전송</button>
                </div>
                <div className="user-package-title">
                    인증코드 입력
                </div>
                <div>
                    <input type="text" value={this.state.inputAuthCode} onChange={this.authCodeCheck}/>
                    {this.state.inputAuthCode !== '' && this.state.isAuthentication &&
                    <div className="auth-true">
                        인증 되었습니다.
                    </div>
                    }
                    {this.state.inputAuthCode !== '' && !this.state.isAuthentication &&
                    <div className="auth-false">
                        인증코드가 일치하지 않습니다.
                    </div>
                    }
                </div>
                <div className="bottom-button-style">
                    <button className="button-wide-style" onClick={this.goToJoin}>회원가입</button>
                    <button className="button-wide-style" onClick={this.btnNoOnClick}>취소</button>
                </div>
            </div>
        );
    }    
}

export default withRouter(CompanyAuthComponent);