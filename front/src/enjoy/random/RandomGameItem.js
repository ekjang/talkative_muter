import React, { Component } from "react";
class RandomGameItem extends Component {

    componentDidMount() {
        this.inputRef.focus()
    }

    inputItemHandler = (e) => {
        this.props.inputItemHandler(this.props.idx, e.target.value)
    }

    plusClickHandler = () => {
        this.props.addItem()
    }

    minusClickHandler = () => {
        this.props.removeItem(this.props.idx)
        this.inputRef.focus()
    }

    enterHandler = (e) => {
        if(e.key === 'Enter') {
            this.props.addItem()
            this.inputRef.focus()
        }
    }

    render() {
        return (
            <div>
                <span>
                <input className="randomInput"
                       text="text"
                       id={this.props.idx}
                       value={this.props.item.value}
                       onChange={this.inputItemHandler}
                       onKeyPress={this.enterHandler}
                       ref={(ref) => {this.inputRef = ref;}}
                />
                </span>
                {this.props.lastIdx === this.props.idx &&
                    <span className="plusIcon"
                          onClick={this.plusClickHandler}>
                        +
                    </span>
                }
                <span className="minusIcon"
                      onClick={this.minusClickHandler}>
                    -
                </span>
            </div>
        );
    }
}
export default RandomGameItem;