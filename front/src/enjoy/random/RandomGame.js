import React, { Component } from "react";
import "./RandomGame.css"
import RandomGameItem from "./RandomGameItem";
class RandomGame extends Component {
    state = {
        subject: '', //주제
        list: [
            // {id: 0, value: ''}
            {value: ''}
        ],
        winning: '',
    }

    startHandler = () => {
        const {list} = this.state
        let size = list.length
        let winning = Math.floor(Math.random() * size)
        this.setState({winning: list[winning].value})
    }

    restartHandler = () => {
        const {list} = this.state
        if(list.length > 0) {
            while (list.length > 0) {
                list.pop()
            }
        }
        this.setState({list: list})
        this.addItem()
    }

    /**
     * 주제 입력 동작
     * @param e
     */
    inputSubjectHandler = (e) => {
        this.setState({subject: e.target.value})
    }

    /**
     * 후보 입력 동작
     * @param id
     * @param value
     */
    inputItemHandler = (idx, value) => {
        const {list} = this.state
        list[idx].value = value
        this.setState({list: list})
    }

    /**
     * 아이템 입력창 추가
     */
    addItem = () => {
        const {list} = this.state
        const nextItem = {value: ''}
        this.setState({list: list.concat(nextItem)})
    }

    removeItem = (idx) => {
        const {list} = this.state
        this.setState({list: list.slice(0, idx).concat(list.slice(idx + 1, list.length))})
    }

    render() {
        return (
            <div className="randombox">
                <div className="rantitle">
                    돌려돌려
                </div>
                <div className="raninbox">
                    <div className="input01">
                        <span className="topic">
                            주제
                        </span>
                        <span>
                            <input type="text" value={this.state.subject} onChange={this.inputSubjectHandler} />
                        </span>
                    </div>
                    {this.state.winning !== '' &&
                    <div>
                        <span>
                            당첨 : {this.state.winning}
                        </span>
                    </div>
                    }
                </div>
                <div>
                    <div className="redol">
                        <span>
                            후보
                        </span>
                        <span>
                        &nbsp;&nbsp;  <button onClick={this.startHandler}> 돌려</button>
                        </span>
                        <span>
                        &nbsp;&nbsp;  <button onClick={this.restartHandler}>다시</button>
                        </span>
                        <div className="input02">
                        {this.state.list.map((item, idx) =>
                            <RandomGameItem
                                item={item}
                                key={idx}
                                idx={idx}
                                onFocusIndex={this.state.onFocusIndex}
                                inputItemHandler={this.inputItemHandler}
                                addItem={this.addItem}
                                removeItem={this.removeItem}
                            />
                        )}
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    }
}
export default RandomGame;