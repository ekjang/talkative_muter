import React, { Component } from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import server_url from "../define/Url"
import "../login/UserStyle.css"
import "./AuthStyle.css"
import NickName from "./NickName";
import AuthTimer from "./AuthTimer";

/**
 * 회사메일 인증코드 전송 화면
 */
class MailAuth extends Component {

    state = {
        companyId: '', //회사 메일 계정
        mailPath: '@datastreams.co.kr', //고정 값
        authCode: 'Abc123!', //생성된 인증코드 (Abc123! 은 테스트 값)
        inputAuthCode: '', //입력 인증코드
        timerOn: false,
        isAuth: false,
        nickNamePopup: false, //별명 설정 팝업 여부
        nickName: localStorage.getItem('nickName') //별명
    }

    /**
     * 회사 메일 계정 입력 동작
     * @param e
     */
    inputHandler = (e) => {
        this.setState({companyId: e.target.value})
    }

    /**
     * 별명 설정 팝업 화면 동작
     */
    nickNamePopup = () => {
        this.setState({nickNamePopup: !this.state.nickNamePopup})
    }

    /**
     * 별명 설정
     * @param nickName
     * @param isAuth
     */
    nickNameSetting = (nickName, isAuth) => {
        this.setState({nickName: nickName, nickNamePopup: !this.state.nickNamePopup, isAuth: isAuth})
        if(nickName !== undefined) {
            localStorage.setItem('nickName', JSON.stringify(nickName))
            //닉네임 서버 저장 요청
            //axios.post
        }
    }

    /**
     * 메일 인증코드 발송 서버 요청 API
     */
    transfer = () => {
        if(this.state.companyId === '') {
            alert("아이디를 입력하세요.")
        } else {
            let mail = this.state.companyId + this.state.mailPath

            window.confirm("[ " + this.state.companyId + this.state.mailPath + " ] 로 인증코드를 전송합니다.!") ?
                axios.post(server_url + "/auth/checkMail", {mail: mail})
                    .then(res => {
                        alert("인증번호가 전송되었습니다.")
                        //서버에서 생성한 인증코드 받기
                        this.setState({timerOn: true, authCode: res.data.key})
                    })
                .catch(res => console.log(res)) &&
                this.refAuthCode.focus()
                : this.refCompanyId.focus();
        }
    }

    /**
     * 인증번호 유효시간 초과 동작 함수
     * @param timerOn
     */
    timerReset = () => {
        alert("인증번호 입력 유효시간이 초과되었습니다. 인증번호를 다시 발급 받으세요.")
        this.setState({timerOn: false, authCode: ''})
    }

    /**
     * 인증코드 체크 함수
     * @param e
     */
    authCodeCheck = (e) => {
        this.setState({inputAuthCode: e.target.value})
        if(this.state.authCode === e.target.value) {
            this.setState({isAuth: true, nickNamePopup: true})
            localStorage.setItem('isAuth', JSON.stringify(true))
        } else {
            this.setState({isAuth: false})
        }
    }

    /**
     * 홈 화면으로
     */
    goToMain = () => {
        if(!this.state.isAuth) {
            alert("인증되지 않았습니다.")
        } else if(this.state.nickName.length == 0) {
            alert("별명이 설정되지 않았습니다.")
        } else {
            this.props.loginCheck(this.state.isAuth, this.state.nickName)
            this.props.history.push("/")
        }
    }

    /**
     * 취소 버튼 클릭 동작
     */
    btnNoOnClick = () => {
        localStorage.clear()
        //닉네임 삭제 서버 요청 ???
        //axios.delete
        //홈 화면으로
        this.props.history.push("/")
    }


    render() {
        return (
            <div className="authbox">
                <div className="user-package-title">
                    회사메일 인증
                </div>
                <div className="authenmail">
                    <input type="text"
                           ref={(ref) => {this.refCompanyId = ref;}}
                           value={this.state.companyId}
                           onChange={this.inputHandler}/>{this.state.mailPath}
                </div>
                <div>
                    <button onClick={this.transfer}
                        style={{marginTop:"15px",width:"80%", height:"31px", background: "lightskyblue", color: "#fff", border: "1px solid lightskyblue", borderRadius: "6px", fontWeight:"600"}}>
                        전송
                    </button>
                </div>
                <div className="user-package-title2">
                    인증코드 입력
                </div>
                <div className="authenmail2">
                    <input type="text"
                           ref={(ref) => {this.refAuthCode = ref;}}value={this.state.inputAuthCode}
                           onChange={this.authCodeCheck}/>
                    {
                        this.state.timerOn &&
                        <AuthTimer
                        />
                    }
                    {this.state.inputAuthCode !== '' && this.state.isAuth &&
                    <div className="auth-true">
                        인증 되었습니다.
                    </div>
                    }
                    {this.state.inputAuthCode !== '' && !this.state.isAuth &&
                    <div className="auth-false">
                        인증코드가 일치하지 않습니다.
                    </div>
                    }
                </div>
                <div>
                    <div className="nickname-title1">
                        <span className="nickbg" onClick={this.nickNamePopup}>
                            별명 &nbsp;
                            <span className="nickname-title2">
                                {this.state.nickName.length > 0 && "변경"}
                                {this.state.nickName.length < 1 && "설정"}
                            </span>
                            &nbsp; 하기
                        </span>
                        <div className="nickname-tip">
                           인증 여부 확인을 위한 별명입니다.
                        </div>
                    </div>
                    {this.state.nickName.length > 0 &&
                    <div className="nickname-style">
                        니 별명은 [ {this.state.nickName} ]
                    </div>
                    }
                    {this.state.nickNamePopup &&
                    <div>
                        <NickName
                            isAuth={this.state.isAuth}
                            nickName={this.state.nickName}
                            nickNamePopup={this.nickNamePopup}
                            nickNameSetting={this.nickNameSetting}
                        />
                    </div>
                    }
                </div>

                <div>
                    <button style={{marginTop:"28px", width:"80%", height:"31px", background: "#3284fb", color: "#fff", border: "1px solid #3284fb", borderRadius: "6px"}}
                            onClick={this.goToMain}>
                        확인
                    </button>
                </div>
                <div>
                    <button style={{marginTop:"11px", width:"80%", height:"31px",  background: "#3284fb", color: "#fff", border: "1px solid #3284fb", borderRadius: "6px"}}
                            onClick={this.btnNoOnClick}>
                        취소
                    </button>
                </div>
            </div>
        );
    }
}
export default withRouter(MailAuth);