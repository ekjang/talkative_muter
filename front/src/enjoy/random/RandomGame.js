import React, { Component } from "react";
import "./RandomGame.css"
import RandomGameItem from "./RandomGameItem";
import "./RandomStyle.css"

class RandomGame extends Component {
    state = {
        subject: '', //주제
        list: [
            // {id: 0, value: ''}
            {value: ''}
        ],
        start: false,
        winning: '',
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate:" + prevState.start+","+this.state.start)
    }

    /**
     * 돌려 버튼 동작 함수
     */
    startHandler = () => {
        console.log("start")
        const {list} = this.state
        //빈값 input box 제거
        const nonBlank = list.filter((d) => {
            return d.value.length !== 0
        })
        this.setState({list: nonBlank})

        //빈값을 제거한 아이템들 중 추첨
        if(nonBlank.length > 1) {
            let winning = Math.floor(Math.random() * nonBlank.length)
            //당첨 아이템 초기화
            this.setState({start: !this.state.start, winning: ''})
            setTimeout(() =>
                    this.setState({winning: nonBlank[winning].value, start: !this.state.start})
                , 3000)
        } else {
            alert("빈칸을 제외한 후보를 더 등록해주세요.")
        }
    }

    /**
     * 다시 버튼 동작 함수
     */
    restartHandler = () => {
        const {list} = this.state
        if(list.length > 0) {
            while (list.length > 0) {
                list.pop()
            }
        }
        this.setState({list: list, winning: ''})
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
     * 아이템 입력창 추가(+) 함수
     */
    addItem = () => {
        const {list} = this.state
        const nextItem = {value: ''}
        this.setState({list: list.concat(nextItem)})
    }

    /**
     * 아이템 입력창 제거 (-) 함수
     * @param idx
     */
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
                    {this.state.start &&
                    <div>
                        <span id="loading"> {/*여기 로딩 애니메이션 넣어주세요:)*/}
                            두구두구
                        </span>
                    </div>
                    }
                    {this.state.winning !== '' &&
                    <div>
                        <span> {/*여기 당첨 아이템 애니메이션 넣어주세요:)*/}
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