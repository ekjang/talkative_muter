import React, { Component } from "react";
class RandomGameItem extends Component {

    inputItemHandler = (e) => {
        this.props.inputItemHandler(this.props.item.id, e.target.value)
    }

    render() {
        console.log(this.props.item)
        return (
            <div>
                <span>
                <input text="text"
                       value={this.props.item.value}
                       onChange={this.inputItemHandler}
                />
                </span>
                <span onClick={this.props.addHandler}>+</span>
            </div>
        );
    }
}
export default RandomGameItem;