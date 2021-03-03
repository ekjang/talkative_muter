import React, { Component } from 'react';
class PopularComponent extends Component {
    state = {
        sizeByPage: ''
    }
    componentDidMount() {
        if(!this.props.isMember) {
            this.setState({sizeByPage: 10})
        }
    }

    render() {
        return (
            <div>
                <div>인기 벙어리</div>
                <div>여기는 리스트 위치</div>
                <div>{this.state.sizeByPage}줄만 보여줘~</div>
            </div>
        );
    }
}
export default PopularComponent;