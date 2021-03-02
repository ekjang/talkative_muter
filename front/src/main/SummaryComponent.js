import React, { Component } from 'react';
import "./MainStyle.css"
class SummaryComponent extends Component {
    render() {
        return (
            <div>
                <div>
                    New 몇개 Today 몇개
                </div>
                <div>오늘 벙어리 최근 5</div>
                <div>인기 벙어리 Top 5</div>
            </div>
        );
    }
}
export default SummaryComponent;