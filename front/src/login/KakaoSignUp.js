import React, { Component } from 'react';
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import server_url from "../define/Url";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"; //redux store에 연결해주는 API
import { loginAction } from "../reducers/user";


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
            hasAgeRange: false,
            ageRange: '',
            hasGender: false,
            gender: '',
            accessToken: '',
            expiresIn: '', //sec
            refreshToken: '',
            refreshTokenExpiresIn: '',
            isAuth: false,
        }
    }

    /**
     * 카카오 로그인 성공 시
     * @param res
     */
    responseKakao = (res) => {
        this.setState({
            id: res.profile.id,
            name: res.profile.properties.nickname,
            hasAgeRange: res.profile.kakao_account.has_age_range,
            ageRange: res.profile.kakao_account.age_range,
            hasGender: res.profile.kakao_account.has_gender,
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
        let ageRange = (this.state.hasAgeRange ? (this.state.ageRange !== undefined && this.state.ageRange !== '' ? this.state.ageRange : "none") : "none")
        let gender = (this.state.hasGender ? (this.state.gender !== undefined && this.state.gender !== '' ? this.state.gender : "none") : "none")

        axios.post(server_url + "/auth/login",
            {id: this.state.id //카카오톡 고유 id
                , ageRange: ageRange //사용자 나이대
                , gender: gender.toUpperCase() //사용자 성별
                // , accessToken: this.state.accessToken
            })
            .then(res => {
                // 회사 메일인증, 메일 인증 최종일자 (또는 유효기간/만료기간 정보) 받기
                // 설정한 닉네임 받아오기 추가..?
                this.setState({isAuth: res.data})
                //id, isAuth 저장하기.. redux처리
                // localStorage.setItem('id', this.state.id)
                // localStorage.setItem('token', this.state.accessToken)

                this.props.loginCheck(res.data, '')
                this.props.storeLoginAction(this.state.id, this.state.accessToken, true) //reducer를 통해 store에 저장
            })
            .catch(res =>
                console.log(res)
            )
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

//store의 state를 컴포넌트의 props에 매핑
const mapStateToProps = (state) => ({
    id: state.user.id,
    token: state.user.token,
    isAuth: state.user.isAuth,
})

//컴포넌트의 특정 함수형 props를 실행했을 때, 지정한 action을 dispatch하도록 설정
const mapDispatchToProps = (dispatch) => ({
    storeLoginAction: (id, token, isAuth) => dispatch(loginAction(id, token, isAuth))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KakaoSignUp));