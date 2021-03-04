import React, { Component } from 'react';
import "./MainStyle.css"
class SummaryComponent extends Component {
    render() {
        return (
            <div>
                <div className="summary-count">
                    New 몇개 Today 몇개
                </div>
                <div>
                    <div className="today-summary-title">
                        오늘 벙어리 최신글
                    </div>
                    <div>
                        list
                    </div>
                </div>
                <div>
                    <div className="today-summary-title">
                        인기 벙어리 Top 5
                    </div>
                    <div>
                        list
                    </div>
                </div>
            </div>
        );
    }
}
export default SummaryComponent;