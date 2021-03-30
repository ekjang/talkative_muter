import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"; //redux store에 연결해주는 API
import { logoutAction } from "../reducers/user"

/**
 * 로그아웃
 */
class Logout extends Component {

    componentDidMount() {
        this.kakaoLogout()
    }

    /**
     * 로그아웃 성공 시 로컬 스토리지 비우기, 홈 화면으로
     */
    logoutHandler = () => {
        this.props.loginCheck(false, '')
        this.props.storeLogoutAction() //reducer를 통해 store에 저장
        localStorage.clear()
        //닉네임 삭제 서버 요청
        //axios.delete
        this.props.history.push("/")
    }

    /**
     * 카카오 로그아웃
     */
    kakaoLogout = () => {
        //CORS 문제로 인해 spring server에서 REST Api로 요청 필요
        //https://kauth.kakao.com/oauth/logout?client_id=fee0816dc12ca183996bd87acd042e2a&logout_redirect_uri=http://localhost:3001/oauth/sign-out

        //!!! 여기 에러나서 확인해야됨.
        // window.Kakao.init("397d5b756b740a3e9f87b34697438206")
        // window.Kakao.isInitialized();

        if(!window.Kakao.Auth.getAccessToken()) {
            alert("Not logged in.")
            return
        }

        window.Kakao.Auth.logout(function(response) {
            if(response) {
                console.log("logout ok")
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

//store의 state를 컴포넌트의 props에 매핑
const mapStateToProps = (state) => ({
    id: state.user.id,
    token: state.user.token,
    isAuth: state.user.isAuth,
})

//컴포넌트의 특정 함수형 props를 실행했을 때, 지정한 action을 dispatch하도록 설정
const mapDispatchToProps = (dispatch) => ({
    storeLogoutAction: () => dispatch(logoutAction())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));