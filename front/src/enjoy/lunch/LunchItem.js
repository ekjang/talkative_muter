import React, { Component } from "react";
class LunchItem extends Component {
    render() {
        return (
            <div>
                <span>
                    {this.props.item.name}
                </span>
                <span>
                    {this.props.item.address}
                </span>
            </div>
        );
    }
}
export default LunchItem;