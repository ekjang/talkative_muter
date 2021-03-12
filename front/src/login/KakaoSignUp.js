import React, { Component } from 'react';
import KaKaoLogin from "react-kakao-login";
import styled from 'styled-components';
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import server_url from "../define/Url";
import {withRouter} from "react-router-dom";

class KakaoSignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
            ageRange: '',
            gender: '',
            accessToken: '',
            expiresIn: '', //sec
            refreshToken: '',
            refreshTokenExpiresIn: '',
        }
    }

    // Kakao Login
    responseKakao = (res) => {
        console.log(res)
        //has_age_range
        //has_gender
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            ageRange: res.profile.kakao_account.age_range,
            gender: res.profile.kakao_account.gender,
            accessToken: res.response.access_token, // 유효시간 2시간
            expiresIn: res.response.expires_in,
            refreshToken: res.response.refresh_token, //2달, 유효기간 1달 남은 시점부터 갱신 가능
            refreshTokenExpiresIn: res.response.refresh_token_expires_in,
            provider: 'kakao'
        })
        this.userInfoPostApi()
    }

    responseFail = (err) => {
        alert(err)
    }

    /////////kakao user info
    userInfoPostApi = () => {
        console.log(this.state.accessToken)
        axios.post(server_url + "/oauth/login",
            {id: this.state.id
                , ageRange: this.state.ageRange
                , gender: this.state.gender
                , accessToken: this.state.accessToken
                , refreshToken: this.state.refreshToken
            }
            )
            .then(res => {
                //서버에서 생성한 인증코드 받기
                this.props.companyAuthCheck(true)
                this.props.history.push("/")
                console.log(res)
            })
            .catch(res => console.log(res))
    }

    render() {
        return (
            <div>
                <div>
                    <KakaoLogin
                        jsKey={'397d5b756b740a3e9f87b34697438206'}
                        onSuccess={this.responseKakao}
                        onFail={this.responseFail}
                        getProfile={true}
                    />


                </div>
            </div>
        );
    }
}

const KaKaoBtn = styled(KaKaoLogin)`
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`

export default withRouter(KakaoSignUp);