import React, { Component } from 'react';
import {Link, withRouter} from "react-router-dom";
import "./MenuStyle.css"

class MenuLink extends Component {

    state = {
        icon: "login"
    }

    componentDidMount() {
        let icon = this.props.isMember ? "logout" : "login";
        this.setState({icon: icon})
    }

    menuList = () => {
        if(this.props.isMember) {
            return (
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/today" >오늘 벙어리</Link></li>
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/popular" >인기 벙어리</Link></li>
                </ul>
            )
        }
    }

    render() {
        return (
            <div className={this.props.menuStatus} id="menu">
                <div className={this.state.icon + "-icon-style"}>
                    <span onClick={() => {this.props.history.push("/" + this.state.icon)}}>
                        {this.state.icon}
                    </span>
                </div>
                {this.menuList()}
                {/*<ul>*/}
                {/*    <li><Link to="/" >Home</Link></li>*/}
                {/*    <li><Link to="/today" >오늘 벙어리</Link></li>*/}
                {/*    <li><Link to="/popular" >인기 벙어리</Link></li>*/}
                {/*</ul>*/}
            </div>
        );
    }
}

export default withRouter(MenuLink);