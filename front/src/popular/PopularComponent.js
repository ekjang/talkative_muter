import React, { Component } from 'react';
import "./PopularStyle.css"

/**
 * 인기 벙어리 컴퍼넌트
 */
class PopularComponent extends Component {
    state = {
        sizeByPage: '',
        schContent: ''
    }

    componentDidMount() {
        if(!this.props.isAuthentication) {
            this.setState({sizeByPage: 10})
        }
        this.searchOnClick()
    }

    inputHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    searchOnClick = () => {
        console.log("검색 버튼 클릭: " + this.props.today)
        //axios.get
    }

    render() {
        return (
            <div className="popbox">
                <div className="popular-title">
                    인기 벙어리
                </div>
                <div>
                    {this.props.isAuthentication &&
                    <div>
                        내용 <input type="text" value={this.state.schContent} onChange={this.inputHandler}/>
                        <button onClick={this.searchOnClick}>검색</button>
                    </div>
                    }
                </div>
                <div className="poplist">여기는 리스트 위치</div>
            </div>
        );
    }
}
export default PopularComponent;