import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MenuStyle.css"

/**
 * 메뉴 링크 정의
 */
class MenuLink extends Component {

    render() {
        let authIcon = this.props.isAuthentication ? "logout" : "login";

        return (
            <div className={this.props.menuStatus} id="menu">
                {this.props.isAuthentication &&
                <span className="text-style">{this.props.nickName}</span>}
                <div id="auth-icon-style">
                    <p id="auth-icon-style-p"><span id="auth-icon-style-span" onClick={() => {this.props.history.push("/" + authIcon)}}>
                        {this.props.isAuthentication ? "나가기" : "로그인"}
                    </span></p>
                </div>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    {(this.props.isAuthentication) &&
                    <li><Link to="/today">오늘 벙어리</Link></li>
                    }
                    {/*아직 구현 안되어 있음.*/}
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                    <li><Link to="/gymInfo" >헬스장 이용 정보</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(MenuLink);