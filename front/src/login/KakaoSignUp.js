import React, { Component } from 'react';
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import server_url from "../define/Url";
import {withRouter} from "react-router-dom";

/**
 * 카카오 로그인 컴퍼넌트
 */
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
            isAuth: false,
            authCheckDate: '',
        }
    }

    /**
     * 카카오 로그인 성공 시
     * @param res
     */
    responseKakao = (res) => {
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

    /**
     * 카카오 로그인 실패 시
     * @param err
     */
    responseFail = (err) => {
        alert(err)
    }

    /**
     * 카카오 로그인 성공 시 토큰 및 정보 서버 요청 API
     */
    userInfoPostApi = () => {
        //test data
        let isAuth = false
        let testData = "2021-04-10"
        this.setState({isAuth: isAuth, authCheckDate: testData})
        this.props.loginCheck(isAuth)

        //!!!현재 서버 구현 안됨.
        // axios.post(server_url + "/oauth/login",
        //     {id: this.state.id
        //         , ageRange: this.state.ageRange
        //         , gender: this.state.gender
        //         , accessToken: this.state.accessToken
        //         , refreshToken: this.state.refreshToken
        //     }
        //     )
        //     .then(res => {
        //         //회사 메일인증, 메일 인증 최종일자 (또는 유효기간/만료기간 정보) 받기
        //         // this.setState({isCompanyAuth: res.data.data.isCompanyAuth, authCheckDate: res.data.data.authCheckDate})
        //
        //         //test data
        //         let isAuth = false
        //         let testData = "2021-04-10"
        //         this.setState({isAuth: isAuth, authCheckDate: testData})
        //         this.props.loginCheck(isAuth)
        //     })
        //     .catch(res => console.log(res))
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
                    {/*<a href = "https://kauth.kakao.com/oauth/authorize?client_id=397d5b756b740a3e9f87b34697438206&redirect_uri=http://localhost:18090/muter/kakao/sign-in&response_type=code&scope">*/}
                    {/*    테스트 </a>*/}
                </div>
            </div>
        );
    }
}
export default withRouter(KakaoSignUp);