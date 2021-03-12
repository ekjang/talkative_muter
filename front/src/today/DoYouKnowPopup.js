import React, { Component } from 'react';
import "./TodayStyle.css"
import axios from "axios";
import server_url from "../define/Url";

/**
 *  글 등록
 * 너 그거 아니? 팝업 컴퍼넌트
 */
class DoYouKnowPopup extends Component {
    state = {
        content: '',
        isSuccess: false
    }

    componentDidMount() {
        this.setState({isSuccess: false})
    }

    componentWillUnmount() {
        this.setState({isSuccess: false})
    }

    /**
     * 입력 동작
     * @param e
     */
    inputHandler = (e) => {
        this.setState({content: e.target.value})
    }

    /**
     * 확인 버튼 클릭
     */
    btnOkOnClick = () => {
        this.postApi()
        this.props.doYouKnowPopup()
    }

    /**
     * 입력 글 등록 서버 요청 API
     */
    postApi = () => {
        axios.post(server_url + "/today/content", {content: this.state.content})
            .then(res => {
                alert("입력 완료!")
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
    }

    render() {
        return (
            <div className="do-you-know-popup">
                <div className="do-you-know-popup-inner">
                    <div className="today-title">
                        너 그거 아니?
                    </div>
                    <div className="do-you-know-popup-content">
                        <textarea rows="4" value={this.state.content} onChange={this.inputHandler}></textarea>
                    </div>
                    <div className="do-you-know-popup-button-style">
                        <button className="button-small1" onClick={this.btnOkOnClick}>확인</button>
                        <button className="button-small1" onClick={this.props.doYouKnowPopup}>취소</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default DoYouKnowPopup;