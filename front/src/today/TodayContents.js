import React, { Component } from 'react';
import "./TodayStyle.css"

class TodayContents extends Component {
    render() {
        return (
            <div>
                <span className="content-item">
                    {this.props.item.content}
                </span>
                <span className="content-item">
                    {this.props.item.registerDate}
                </span>
                <span className="content-item">
                    {this.props.item.likes}
                </span>
                <span className="content-item">
                    {this.props.item.dislikes}
                </span>
                <span className="content-item">
                    {this.props.item.reports}
                </span>
            </div>
        );
    }
}

export default TodayContents