import React, { Component } from 'react';

/**
 * 홈 메뉴 아이템 컴퍼넌트
 */
class SummaryItem extends Component {
    render() {
        return (
            <div>
                <span className="content-item0">
                    {this.props.item.id}
                </span>
                <span className="content-item1">
                    {this.props.item.content}
                </span>
                <span className="content-item2" dataformatas="YYYY-MM-DD HH:mm:ss">
                    {this.props.item.registerDate}
                </span>
            </div>
        );
    }
}
export default SummaryItem;