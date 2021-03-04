import React, { Component } from 'react';
import "./TodayStyle.css"

class DoYouKnowPopup extends Component {

    state = {
        todayWrite: ''
    }

    inputHandler = (e) => {
        this.setState({todayWrite: e.target.value})
    }

    btnOkOnClick = () => {
        console.log("확인 버튼")
        //axios.post
        this.props.doYouKnowPopup()
    }

    render() {
        return (
            <div className="do-you-know-popup">
                <div className="do-you-know-popup-inner">
                    <div className="today-title">
                        너 그거 아니?
                    </div>
                    <div className="do-you-know-popup-content">
                        <textarea rows="4" value={this.state.todayWrite} onChange={this.inputHandler}></textarea>
                    </div>
                    <div className="bottom-button-style">
                        <button className="button-small1" onClick={this.btnOkOnClick}>확인</button>
                        <button className="button-small1" onClick={this.props.doYouKnowPopup}>취소</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default DoYouKnowPopup;