import React, { Component } from 'react';
class PopularComponent extends Component {
    state = {
        sizeByPage: '',
        schContent: ''
    }

    componentDidMount() {
        if(!this.props.isMember) {
            this.setState({sizeByPage: 10})
        }
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
                <div>인기 벙어리</div>
                <div>
                    {this.props.isMember &&
                    <div>
                        내용 <input type="text" value={this.state.schContent} onChange={this.inputHandler}/>
                        <button onClick={this.searchOnClick}>검색</button>
                    </div>
                    }
                </div>
                <div>여기는 리스트 위치</div>
            </div>
        );
    }
}
export default PopularComponent;