import React, { Component } from "react";
import RandomGameItem from "./RandomGameItem";
class RandomGame extends Component {
    state = {
        subject: '', //주제
        list: [
            {id: 0, value: ''}
        ],
    }

    addList = () => {
        const {list} = this.state
        this.setState({
            list: list.concat({ id: this.id++, value: '' })
        })
    }

    addHandler = (e) => {
        this.addList();
    }

    clickHandler = () => {

    }

    inputSubjectHandler = (e) => {
        this.setState({subject: e.target.value})
    }

    inputItemHandler = (id, value) => {
        // const {list} = this.state
        // list.map((item) => {
        //     if(parseInt(item.id) !== parseInt(id)) {
        //         list.pop()
        //     }
        // })
        // list.push({id: id, value: value})
        // this.setState({list: list})
    }

    render() {
        console.log(this.state.list)
        return (
            <div>
                <div>
                    오늘 누가 쏠래?
                </div>
                <div>
                    <span>
                        주제
                    </span>
                    <span>
                        <input text="text" value={this.state.subject} onChange={this.inputSubjectHandler} />
                    </span>
                </div>
                <div>
                    <div>
                        <span>
                            후보
                        </span>
                        <span>
                            <button onClick={this.clickHandler}>등록</button>
                        </span>
                        {this.state.list.map((item, idx) =>
                            <RandomGameItem
                                item={item}
                                key={idx}
                                addHandler={this.addHandler}
                                inputItemHandler={this.inputItemHandler}
                            />
                        )}
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}
export default RandomGame;