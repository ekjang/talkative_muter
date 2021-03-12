import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class LogoutComponent extends Component {

    componentDidMount() {
        this.kakaoLogout()
    }

    logoutHandler = () => {
        this.props.companyAuthCheck(false)
        localStorage.clear()
        //닉네임 삭제 서버 요청
        //axios.delete
        this.props.history.push("/")
    }

    kakaoLogout = () => {
        //https://kauth.kakao.com/oauth/logout?client_id=fee0816dc12ca183996bd87acd042e2a&logout_redirect_uri=http://localhost:3001/oauth/sign-out
        window.Kakao.init("397d5b756b740a3e9f87b34697438206")
        window.Kakao.isInitialized();

        console.log(window.Kakao.Auth.getAccessToken())
        if(!window.Kakao.Auth.getAccessToken()) {
            alert("Not logged in.")
            return
        }

        window.Kakao.Auth.logout(function(response) {
            if(response) {
                console.log("response:"+response)
            } else {
                return
            }
        });
        this.logoutHandler()
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
export default withRouter(LogoutComponent);