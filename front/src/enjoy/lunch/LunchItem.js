import React, { Component } from "react";
class LunchItem extends Component {
    render() {
        return (
            <div>
                <span>
                    {this.props.item.restaurant}
                </span>
            </div>
        );
    }
}
export default LunchItem;