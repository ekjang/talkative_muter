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
        onLoading: false,
        winning: '',
        lastIdx: 0,
    }

    /**
     * 돌려 버튼 동작 함수
     */
    startHandler = () => {
        const {list} = this.state
        //빈값 input box 제거
        const nonBlank = list.filter((d) => {
            return d.value.length !== 0
        })

        //빈값을 제거한 아이템들 중 추첨
        if(nonBlank.length > 1) {
            this.setState({list: nonBlank})
            let winning = Math.floor(Math.random() * nonBlank.length)
            //당첨 아이템 초기화
            this.setState({onLoading: !this.state.onLoading, winning: ''})
            setTimeout(() =>
                    this.setState({winning: nonBlank[winning].value, onLoading: !this.state.onLoading})
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
     * 입력한 검색어 삭제 동작
     */
    clearInput = () => {
        this.setState({subject: ''})
        this.inputRef.focus()
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
        this.setState({list: list.concat(nextItem), lastIdx: list.length})
    }

    /**
     * 아이템 입력창 제거 (-) 함수
     * @param idx
     */
    removeItem = (idx) => {
        const {list} = this.state
        this.setState({list: list.slice(0, idx).concat(list.slice(idx + 1, list.length)), lastIdx: list.length - 2})
    }

    // friendsHandler = () => {
    //     KakaoFriends()
    // }

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
                            <input type="text"
                                   placeholder="주제를 입력해 주세요"
                                   value={this.state.subject}
                                   onChange={this.inputSubjectHandler}
                                   ref={(ref) => {this.inputRef = ref;}}
                            />
                            {this.state.subject.length > 0 &&
                                <span className="x-style" onClick={this.clearInput}>X</span>
                            }
                        </span>
                    </div>
                    {this.state.onLoading &&
                        <div className="on-loading">
                            <div className="lds-hourglass">
                            </div>
                        </div>
                    }
                    {this.state.winning !== '' &&
                    <div className="dangcheom">
                        <span> {/*여기 당첨 아이템 애니메이션 넣어주세요:)*/}
                            당첨 : {this.state.winning}
                        </span>
                        {/*<span>*/}
                        {/*    <button onClick={this.friendsHandler}>공유하기</button>*/}
                        {/*</span>*/}
                    </div>
                    }
                </div>
                <div>
                    <div className="redol">
                        <span>
                            후보
                        </span>
                        <span>
                        &nbsp;&nbsp;  <button className="dolbtn" onClick={this.startHandler}> 돌려</button>
                        </span>
                        <span>
                        &nbsp;&nbsp;  <button className="dolbtn" onClick={this.restartHandler}>다시</button>
                        </span>
                        <div className="input02">
                        {this.state.list.map((item, idx) =>
                            <RandomGameItem
                                item={item}
                                key={idx}
                                idx={idx}
                                lastIdx={this.state.lastIdx}
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