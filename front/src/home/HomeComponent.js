import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuMain";
import RouterComponent from "../common/RouterComponent";
import "./MainStyle.css"
import BottomText from "../common/BottomText";
import { connect } from 'react-redux';


/**
 * 홈 컴퍼넌트
 * - 슬라이드 메뉴
 * - 컨텐츠 컴퍼넌트
 */
class HomeComponent extends Component {
    state = {
        today: new Date().toISOString().substr(0, 10),
        id: '',
        token: '',
        isAuth: false,
        nickName: (localStorage.getItem('nickName') !== null ? localStorage.getItem('nickName') : '') //등록 별명
    }

    componentDidMount() {
        let date = new Date().toISOString().substr(0, 10)
        const {id, token, isAuth} = this.props //redux data 가져오기
        this.setState({today: date
            , id: id
            , token: token
            , isAuth: isAuth
            , nickName: localStorage.getItem('nickName')})
    }

    //로그인 성공 시 토큰, 인증여부, 별명 설정
    loginCheck = (isAuth, nickName) => {
        let date = new Date().toISOString().substr(0, 10)
        this.setState({today: date
            , nickName: nickName})
    }


    render() {
        return (
            <div className="site-style">
                <Router>
                    <div>
                        <MenuComponent
                            today={this.state.today}
                            nickName={this.state.nickName}
                        />
                        <div className="content-style">
                            <RouterComponent
                                today={this.state.today}
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

const mapStateToProps = (state) => ({
    id: state.user.id,
    token: state.user.token,
    isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(HomeComponent);