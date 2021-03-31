import React, { Component } from "react";
import axios from "axios";
import server_url from "../../define/Url";
import LunchItem from "./LunchItem";
import "./LunchStyle.css"
import ScrollButton from "../../common/ScrollButton";


class LunchMain extends Component {

    state = {
        schContent: '',
        list: [], //조회 전체 결과 리스트
        view: [], //화면에 보여질 결과 리스트
        recommend: '',
        recommendUrl: '',
        onLoading: false,
        page: 0,
        pageSize: 10,
        isMore: true,
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
        this.inputRef.focus()
    }

    /**
     * 검색해 버튼 동작
     */
    searchHandler = () => {
        axios.get(server_url + "/lunch/list", {params: {search: this.state.schContent}})
            .then(res => {
                this.setState({list: res.data.list, view: [], page: 0});
                this.moreView()
            })
            .catch(err => console.log(err));

    }

    /**
     * 뽑아줘 버튼 동작
     *  - 검색해 결과 목록 중 하나를 랜덤하게 추출하는 서비스
     */
    recommend = () => {
        const { list, view } = this.state
        if(view.length > 0) {
            let winning = Math.floor(Math.random() * view.length)

            this.setState({onLoading: !this.state.onLoading})

            setTimeout(() =>
            this.setState({recommend: view[winning].name, recommendUrl: view[winning].address, onLoading: !this.state.onLoading})
            , 3000)
        } else {
            this.searchRef.focus();
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
            this.setState({list: list, view: [], page: 0, recommend: '', recommendUrl: ''})
            // this.moreView()
        }
    }

    enterHandler = (e) => {
        if(e.key == 'Enter') {
            this.searchHandler()
        }
    }

    moreView = () => {
        let page = this.state.page + 1
        let view = this.state.list.slice((page - 1) * this.state.pageSize, page * this.state.pageSize)
        this.setState({page: page, view: [...this.state.view, ...view]})
        if(this.state.list.length > 0) {
            if(this.state.list.length === (page - 1) * this.state.pageSize + view.length) {
                this.setState({isMore: false})
            } else {
                this.setState({isMore: true})
            }
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
                            <span>
                                <input type="text"
                                       value={this.state.schContent}
                                       onChange={this.inputHandler}
                                       onKeyPress={this.enterHandler}
                                       ref={(ref) => {this.inputRef = ref;}}
                                />
                                {this.state.schContent.length > 0 &&
                                <span className="x-style" onClick={this.clearInput}>X</span>
                                }
                            </span>
                            {/*메뉴를 &nbsp; &nbsp;*/}
                            <button className="Bopbtn0"
                                    onClick={this.searchHandler}
                                    ref={(ref) => {this.searchRef = ref;}}>검색해</button>
                        </div>
                        <div>
                            <button className="Bopbtn" onClick={this.recommend}>뽑아줘</button>
                            <button  className="Bopbtn" onClick={this.reset}>다시</button>
                        </div>

                        {this.state.onLoading &&
                        <div>
                            <div className="bouncingLoader">
                                <div></div>
                            </div>
                        </div>
                        }
                        {this.state.recommend !== '' && !this.state.onLoading &&
                        <div>
                            <span className="typing-txt">
                                오늘은 <span className="txt-style"> {this.state.recommend} </span>
                                (<a href={this.state.recommendUrl} target="_blank">{this.state.recommendUrl}</a>)
                                (으)로 가자!!
                            </span>
                        </div>
                        }
                        <div className="menulist">
                            {this.state.view.map((item, idx) =>
                            <LunchItem
                                item={item}
                                key={idx}
                            />
                            )}
                        </div>
                        <div>
                            {this.state.list.length > 10 && this.state.isMore &&
                            <button className="button-more" onClick={this.moreView}>More +</button>
                            }
                        </div>
                        <div>
                            {this.state.view.length > 10 &&
                            <ScrollButton scrollStepInPx="50"
                                          delayInMs="16.66"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default LunchMain;