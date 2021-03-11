import React, { Component } from "react";

class NickNameComponent extends Component {

    state = {
        nickName: this.props.nickName
    }

    inputHandler = (e) => {
        this.setState({nickName: e.target.value})
    }


    btnOkOnClick = () => {
        if(this.state.nickName.length > 0) {
            if (window.confirm("[ " + this.state.nickName + " ] 로 설정하시겠습니까?")) {
                this.props.nickNameSetting(this.state.nickName)
            } else {
                return
            }
        } else {
            alert("닉네임을 입력해주세요.")
        }
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
                    </div>
                </div>
            </div>
        );
    }
}
export default NickNameComponent;