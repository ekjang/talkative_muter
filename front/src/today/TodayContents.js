import React, { Component } from 'react';
import "./TodayStyle.css"

class TodayContents extends Component {
    render() {
        return (
            <div>
                {this.props.item}
            </div>
        );
    }
}

export default TodayContents