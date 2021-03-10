import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MenuStyle.css"

/**
 * 메뉴 링크 정의
 */
class MenuLink extends Component {

    render() {
        // let memberIcon = this.props.isMember ? "logout" : "login";
        let authIcon = this.props.isAuthentication ? "logout" : "authentication";

        return (
            <div className={this.props.menuStatus} id="menu">
                {this.props.isMember &&
                <span className="text-style">회원</span>
                }
                {this.props.isAuthentication &&
                <span className="text-style">인증</span>}
                {/*<div className={memberIcon + "-icon-style"}>*/}
                {/*    <span onClick={() => {this.props.history.push("/" + memberIcon)}}>*/}
                {/*        {memberIcon}*/}
                {/*    </span>*/}
                {/*</div>*/}
                <div className={authIcon + "-icon-style"}>
                    <span onClick={() => {this.props.history.push("/" + authIcon)}}>
                        {authIcon}
                    </span>
                </div>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    {this.props.isMember || this.props.isAuthentication &&
                    <li><Link to="/today">오늘 벙어리</Link></li>
                    }
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                    <li><Link to="/gymInfo" >헬스장 이용 정보</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(MenuLink);