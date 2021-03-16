import React, { Component } from "react";
class RandomGameItem extends Component {

    inputItemHandler = (e) => {
        this.props.inputItemHandler(this.props.idx, e.target.value)
        this.inputRef.focus()
    }

    plusClickHandler = () => {
        this.props.addItem()
    }

    minusClickHandler = () => {
        this.props.removeItem(this.props.idx)
        this.inputRef.focus()
    }

    enterHandler = (e) => {
        if(e.key == 'Enter') {
            this.props.addItem()
            this.inputRef.focus()
        }
    }

    render() {
        return (
            <div>
                <span>
                <input text="text"
                       id={this.props.idx}
                       value={this.props.item.value}
                       onChange={this.inputItemHandler}
                       onKeyPress={this.enterHandler}
                       ref={(ref) => {this.inputRef = ref;}}
                />
                </span>
                <span onClick={this.plusClickHandler}>+</span>
                <span onClick={this.minusClickHandler}>-</span>
            </div>
        );
    }
}
export default RandomGameItem;