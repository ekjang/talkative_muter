import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MenuStyle.css"
import { connect } from 'react-redux';


/**
 * 메뉴 링크 정의
 */
class MenuLink extends Component {


    render() {
        let authIcon = this.props.isAuth ? "logout" : "login";

        return (
            <div className={this.props.menuStatus} id="menu">
                {this.props.isAuth && this.props.nickName !== '' &&
                    <div className="text-style" onClick={this.props.updateNickName}>{this.props.nickName}</div>
                }
                {this.props.isAuth && this.props.nickName === '' &&
                    <div>
                        <div className="text-style" onClick={this.props.updateNickName}>닉네임 설정하기</div>
                    </div>
                }
                <div id="auth-icon-style">
                    <p id="auth-icon-style-p">
                        <span id="auth-icon-style-span" onClick={() => {this.props.history.push("/" + authIcon)}}>
                        {this.props.isAuth ? "나가기" : "들어가기"}
                        </span>
                    </p>
                </div>
                <ul>
                    <li><Link to="/" >홈</Link></li>
                    {
                        (this.props.isAuth) &&
                        <li><Link to="/today">오늘 벙어리</Link></li>
                    }
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                    <li><Link to="/gymInfo" >헬스장 이용 정보</Link></li>
                    <li><Link to="/randomGame" >돌려돌려</Link></li>
                    <li><Link to="/lunch" >오늘 뭐 먹지?</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
});

export default withRouter(connect(mapStateToProps)(MenuLink));