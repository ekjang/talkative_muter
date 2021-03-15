import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuMain";
import RouterComponent from "../common/RouterComponent";
import "./MainStyle.css"
import BottomText from "../common/BottomText";

/**
 * 홈 컴퍼넌트
 * - 슬라이드 메뉴
 * - 컨텐츠 컴퍼넌트
 */
class HomeComponent extends Component {
    state = {
        today: new Date().toISOString().substr(0, 10),
        token: '', //로그인 인증 토큰
        isAuth: false, //사용 인증 여부
        nickName: '' //등록 별명
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
        localStorage.setItem('isAuth', JSON.stringify(isAuth))
        localStorage.setItem('nickName', JSON.stringify(nickName))
    }


    render() {
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