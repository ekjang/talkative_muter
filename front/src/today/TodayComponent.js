import React, { Component } from 'react';
import "./TodayStyle.css"
class TodayComponent extends Component {

    state = {
        schContent: ''
    }

    componentDidMount() {
        this.searchOnClick()
    }

    inputHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    searchOnClick = () => {
        console.log("검색 버튼 클릭: " + this.state.schContent)
        //axios.get
    }

    render() {
        return (
            <div>
                <div className="today-title">
                    오늘 벙어리
                </div>
                <div>
                    내용 <input type="text" value={this.state.schContent} onChange={this.inputHandler} />
                    <button onClick={this.searchOnClick} >검색</button>
                </div>
                <div>여기는 리스트 위치</div>
            </div>
        );
    }
}
export default TodayComponent;