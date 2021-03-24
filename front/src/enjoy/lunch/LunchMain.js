import React, { Component } from "react";
import axios from "axios";
import server_url from "../../define/Url";
import LunchItem from "./LunchItem";
import "./LunchStyle.css"


class LunchMain extends Component {

    state = {
        schContent: '',
        list: [],
        recommend: '',
    }

    /**
     * 입력 동작
     * @param e
     */
    inputHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    /**
     * 입력한 검색어 삭제 동작
     */
    clearInput = () => {
        this.setState({schContent: ''})
        this.refInput.focus()
    }

    /**
     * 검색해 버튼 동작
     */
    searchGoogle = () => {
        axios.get(server_url + "/lunch/list")
            .then(res => {
                this.setState({list: res.data.list});
            })
            .catch(err => console.log(err));

    }

    /**
     * 뽑아줘 버튼 동작
     *  - 검색해 결과 목록 중 하나를 랜덤하게 추출하는 서비스
     */
    recommend = () => {
        const { list } = this.state
        if(list.length > 0) {
            let winning = Math.floor(Math.random() * list.length)
            this.setState({recommend: list[winning].restaurant})
        } else {
            this.refSearch.focus();
            alert("'검색해' 를 눌러주세요.");
        }
    }

    /**
     * 다시 버튼 동작
     *  - 랜덤 추출 결과를 다시
     */
    reset = () => {
        const {list} = this.state
        if(list.length > 0) {
            while (list.length > 0) {
                list.pop()
            }
            this.setState({list: list, recommend: ''})
        }
    }

    render() {
        return (
            <div>
                <div className="lunchbox">
                            <div className="luntitle">오늘 뭐먹지?</div>

                    <div className="buttons">
                        <div>
                            {/*검색 서비스는 api 찾아보고 추후 구현 예정*/}
                            {/*<span>*/}
                            {/*    <input type="text"*/}
                            {/*           value={this.state.schContent}*/}
                            {/*           onChange={this.inputHandler}*/}
                            {/*           ref={(ref) => {this.refInput = ref;}}*/}
                            {/*    />*/}
                            {/*    <span onClick={this.clearInput}>X</span>*/}
                            {/*</span>*/}
                            메뉴를 &nbsp; &nbsp;
                            <button className="Bopbtn0" onClick={this.searchGoogle}
                                    ref={(ref) => {this.refSearch = ref;}}>검색해</button>
                        </div>
                        <div>
                            <button className="Bopbtn" onClick={this.recommend}>뽑아줘</button>
                            <button  className="Bopbtn" onClick={this.reset}>다시</button>
                        </div>

                        {this.state.recommend !== '' &&
                        <div>
                            <span>
                                오늘은 [[[ {this.state.recommend} ]]] (으)로 가자!!
                            </span>
                        </div>
                        }
                        <div className="menulist">
                            {this.state.list.map((item, idx) =>
                            <LunchItem
                                item={item}
                                key={idx}
                            />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LunchMain;