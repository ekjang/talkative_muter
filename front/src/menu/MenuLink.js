import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MenuStyle.css"

/**
 * 메뉴 링크 정의
 */
class MenuLink extends Component {
    render() {
        let icon = this.props.isMember ? "logout" : "login";

        return (
            <div className={this.props.menuStatus} id="menu">
                <div className={icon + "-icon-style"}>
                    <span onClick={() => {this.props.history.push("/" + icon)}}>
                        {icon}
                    </span>
                </div>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    {this.props.isMember &&
                    <li><Link to="/today">오늘 벙어리</Link></li>
                    }
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                </ul>
            </div>
        );
    }
}

export default withRouter(MenuLink);