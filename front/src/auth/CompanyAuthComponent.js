import React, { Component } from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import server_url from "../define/Url"
import "../user/UserStyle.css"
import NickNameComponent from "./NickNameComponent";

/**
 * 회사메일 인증코드 전송 화면
 */
class CompanyAuthComponent extends Component {

    state = {
        companyId: '',
        mailPath: '@datastreams.co.kr',
        authCode: 'Abc123!', /////test :Abc123!
        inputAuthCode: '',
        isAuthentication: false,
        namePopup: false, //popup 여부
        nickName: ''
    }

    inputHandler = (e) => {
        this.setState({companyId: e.target.value})
    }

    //취소 버튼 클릭
    btnNoOnClick = () => {
        localStorage.clear()
        this.props.history.push("/")
    }

    nickNamePopup = (nickName) => {
        this.setState({nickName: nickName, namePopup: !this.state.namePopup})
        localStorage.setItem('nickName', JSON.stringify(nickName))
    }

    //메일 인증코드 전송
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
                        this.setState({authCode: res.data.key})
                    })
                .catch(res => console.log(res)) &&
                this.refAuthCode.focus()
                : this.refCompanyId.focus();
        }
    }

    //인증코드 체크
    authCodeCheck = (e) => {
        this.setState({inputAuthCode: e.target.value})
        if(this.state.authCode === e.target.value) {
            this.setState({isAuthentication: true, namePopup: true})
            localStorage.setItem('isAuthentication', JSON.stringify(true))
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
            this.props.companyAuthCheck(true)
            this.props.history.push("/join")
        }
    }

    //인증 후 홈 화면으로
    goToMain = () => {
        if(!this.state.isAuthentication) {
            alert("인증되지 않았습니다.")
        } else {
            this.props.companyAuthCheck(true)
            this.props.history.push("/")
        }
    }



    render() {
        return (
            <div className="authbox">
                <div className="user-package-title">
                    회사메일 인증
                </div>
                <div className="authenmail">
                    <input type="text" ref={(ref) => {this.refCompanyId = ref;}} value={this.state.companyId} onChange={this.inputHandler}/>{this.state.mailPath}
                </div>
                <div><button onClick={this.transfer} style={{marginTop:"15px",width:"80%", height:"31px", marginTop:"20px"}}>전송</button>
                </div>
                <div className="user-package-title2">
                    인증코드 입력
                </div>
                <div className="authenmail2">
                    <input type="text" ref={(ref) => {this.refAuthCode = ref;}}value={this.state.inputAuthCode} onChange={this.authCodeCheck}/>
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
                <div>
                    {this.state.isAuthentication && this.state.namePopup &&
                    <div>
                        <NickNameComponent
                            nickNamePopup={this.nickNamePopup}
                        />
                    </div>
                    }
                </div>

                <div><button onClick={this.transfer} style={{marginTop:"28px", width:"80%", height:"31px", marginTop:"20px"}}onClick={this.goToMain}>확인</button>{/*<button className="button-wide-style" onClick={this.goToJoin}>회원가입</button>*/}
                </div>
                <div><button onClick={this.transfer} style={{marginTop:"12px", width:"80%", height:"31px", marginTop:"20px"}} onClick={this.btnNoOnClick}>취소</button>
                </div>

            </div>
            
           
        );
    }
}

export default withRouter(CompanyAuthComponent);