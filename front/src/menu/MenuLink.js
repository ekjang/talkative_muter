import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./MenuStyle.css"

class MenuLink extends Component {
    constructor(props) {
        super(props);
        // Any number of links can be added here
    }
    render() {
        return (
            <div className={this.props.menuStatus} id="menu">
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