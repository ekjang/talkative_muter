import React, { Component } from 'react';
import MenuLink from "./MenuLink";
import {withRouter} from "react-router-dom";
import './MenuStyle.css'
import NickName from "../auth/NickName";

/**
 * 메뉴 컴퍼넌트
 * - 슬라이드 액션 정의
 */
class MenuMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false, //슬라이드 메뉴 열림 여부
            nickName: this.props.nickName,
            nickNamePopup: false,
        };
        this.menuToggle = this.menuToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
        // this.popupHandler() //닉네임 설정 팝업
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

    updateNickName = () => {
        let message = ''

        if(this.props.isAuth) {
            if (this.state.nickName === '') {
                message = "닉네임을 설정하시겠습니까?"
            } else {
                message = "당신의 닉네임은 " + this.props.nickName + " 입니다. 변경하시겠습니까?"
            }
            if(window.confirm(message)) {
                this.setState({nickNamePopup: !this.state.nickNamePopup})
            }
        }
    }

    popupHandler = () => {
        if(this.props.nickName === '') {
            this.updateNickName()
        }
    }

    /**
     * 별명 설정 팝업 화면 동작
     */
    nickNamePopup = () => {
        this.setState({nickNamePopup: !this.state.nickNamePopup, nickName: localStorage.getItem("nickName")})
    }

    /**
     * 별명 설정
     * @param nickName
     * @param isAuth
     */
    nickNameSetting = (nickName) => {
        if(nickName !== undefined) {
            localStorage.setItem('nickName', nickName)
            //닉네임 서버 저장 요청
            //axios.post
        }
        this.nickNamePopup()
    }

    render() {
        let menuStatus = this.state.isOpen ? "isopen" : "";

        return (
            <div>
                {this.state.nickNamePopup &&
                <div>
                    <NickName
                        isAuth={this.props.isAuth}
                        nickName={this.state.nickName}
                        nickNamePopup={this.nickNamePopup}
                        nickNameSetting={this.nickNameSetting}
                    />
                </div>
                }
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
                        nickName={this.state.nickName}
                        updateNickName={this.updateNickName}
                    />
                </div>
            </div>
        );
    }
}
export default withRouter(MenuMain);