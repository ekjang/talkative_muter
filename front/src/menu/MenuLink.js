import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./MenuStyle.css"

class MenuLink extends Component {
    constructor(props) {
        super(props);
        // Any number of links can be added here
    }
    render() {
        let icon = this.props.isMember ? "logout" : "login";
        return (
            <div className={this.props.menuStatus} id="menu">
                <div className="menulink-style">
                    <span>
                        <Link to={"/"+icon}>{icon}</Link>
                    </span>
                </div>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/today" >오늘 벙어리</Link></li>
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                </ul>
            </div>
        );
    }
}

export default MenuLink;