import React, { Component } from 'react';
import MenuLink from "./MenuLink";
import {withRouter} from "react-router-dom";
import './MenuStyle.css'

/**
 * 메뉴 컴퍼넌트
 * - 슬라이드 액션 정의
 */
class MenuMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, //슬라이드 메뉴 열림 여부
        };
        this.menuToggle = this.menuToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
        // this.memberAuthCheck()
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
    }

    handleClick = () => {
        if(this.state.isOpen === true) {
            this.setState({isOpen: false})
        }
    }

    //슬라이드 메뉴 동작
    menuToggle = (e) => {
        e.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    }

    //타이틀 클릭 동작, 메인화면으로
    titleOnClick = () => {
        this.props.history.push("/")
    }

    render() {
        let menuStatus = this.state.isOpen ? "isopen" : "";

        return (
            <div>
                <div className="menubar">
                    <div className="hambclicker"   onClick={this.menuToggle}></div>
                    <div id="hambmenu" className={menuStatus}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="main-title" onClick={this.titleOnClick} />
                </div>
                <MenuLink
                    menuStatus={menuStatus}
                    isAuth={this.props.isAuth}
                    nickName={this.props.nickName}
                />
            </div>
        );
    }
}
export default withRouter(MenuMain);