import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuMain";
import RouterComponent from "../common/RouterComponent";
import "./MainStyle.css"
import BottomText from "../common/BottomText";

import * as user from "../reducers/user"


const mapStateToProps = (state) => ({
    id: state.user.id,
    token: state.user.token,
    isAuth: state.user.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
    onLoginAction: () => dispatch(user.loginAction()),
    onLogoutAction: () => dispatch(user.logoutAction()),
})

/**
 * 홈 컴퍼넌트
 * - 슬라이드 메뉴
 * - 컨텐츠 컴퍼넌트
 */
class HomeComponent extends Component {
    state = {
        today: new Date().toISOString().substr(0, 10),
        token: (localStorage.getItem('token') !== null ? localStorage.getItem('token') : ''), //로그인 인증 토큰
        isAuth: (localStorage.getItem('isAuth') !== null ? localStorage.getItem('isAuth') : false), //사용 인증 여부
        nickName: (localStorage.getItem('nickName') !== null ? localStorage.getItem('nickName') : '') //등록 별명
    }

    componentDidMount() {
        let date = new Date().toISOString().substr(0, 10)
        this.setState({today: date
            , token: localStorage.getItem('token')
            , isAuth: localStorage.getItem('isAuth')
            , nickName: localStorage.getItem('nickName')})
    }

    //로그인 성공 시 토큰, 인증여부, 별명 설정
    loginCheck = (isAuth, nickName) => {
        let date = new Date().toISOString().substr(0, 10)
        this.setState({today: date
            , token: localStorage.getItem('token')
            , isAuth: isAuth
            , nickName: nickName})
        localStorage.setItem('isAuth', isAuth)
        localStorage.setItem('nickName', nickName)
    }


    render() {
        const {id, token, isAuth} = this.props
        console.log(id+","+token+","+isAuth)
        return (
            <div className="site-style">
                <Router>
                    <div>
                        <MenuComponent
                            today={this.state.today}
                            isAuth={this.state.isAuth}
                            nickName={this.state.nickName}
                        />
                        <div className="content-style">
                            <RouterComponent
                                today={this.state.today}
                                isAuth={this.state.isAuth}
                                nickName={this.state.nickName}
                                loginCheck={this.loginCheck}
                            />
                        </div>
                    </div>
                </Router>
                <BottomText />
            </div>
        );
    }
}
export default HomeComponent;