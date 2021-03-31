import React, { Component } from "react";
class LunchItem extends Component {
    render() {
        return (
            <div>
                <span>
                    {this.props.item.name}
                </span>
                <span>
                    <a href={this.props.item.address} target="_blank">{this.props.item.address}</a>
                </span>
            </div>
        );
    }
}
export default LunchItem;