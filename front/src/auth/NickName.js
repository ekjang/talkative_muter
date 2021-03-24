import React, { Component } from "react";

class NickName extends Component {

    state = {
        nickName: this.props.nickName,
        isAuth: this.props.isAuth
    }

    inputHandler = (e) => {
        this.setState({nickName: e.target.value})
    }


    btnOkOnClick = () => {
        if (window.confirm("[ " + this.state.nickName + " ] 로 설정하시겠습니까?")) {
            this.props.nickNameSetting(this.state.nickName)
        } else {
            this.props.nickNamePopup()
        }
    }

    btnNoOnClick = () => {
        this.props.nickNamePopup()
    }

    render() {
        return (
            <div>
                <div className="do-you-know-popup-inner">
                    <div className="today-title">
                         별명 설정하기 
                    </div>
                    <div className="do-you-know-popup-content">
                        <textarea rows="4" value={this.state.nickName} onChange={this.inputHandler}></textarea>
                    </div>
                    <div className="do-you-know-popup-button-style">
                        <button className="button-small1" onClick={this.btnOkOnClick}>확인</button>
                        <button className="button-small1" onClick={this.btnNoOnClick}> 취소</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default NickName;