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
        if(this.state.nickName.length > 0) {
            if (window.confirm("[ " + this.state.nickName + " ] 로 설정하시겠습니까?")) {
                //중복 닉네임 있는지 서버 요청 체크
                //axios.get => return data : nickName, isAuth
                let response = false
                ////////////////////////test
                if(localStorage.getItem('nickName') !== null) {
                    response = true
                }

                this.props.nickNameSetting(this.state.nickName, this.props.isAuth || response)
            } else {
                return
            }
        } else {
            alert("닉네임을 입력해주세요.")
        }
    }

    btnNoOnClick = () => {
        if (this.state.nickName.length < 1) {
            if (window.confirm("닉네임을 설정하지 않으면 인증처리가 완료되지 않습니다. 설정하시겠습니까?")) {
                return
            }
        } else {
            this.props.nickNameSetting(this.props.nickName, this.props.isAuth)
            return
        }
        this.props.nickNameSetting(this.state.nickName, this.state.isAuth)
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