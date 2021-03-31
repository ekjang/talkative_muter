import React, { Component } from 'react';
import axios from "axios";
import "./TodayStyle.css"
import { withRouter } from "react-router-dom";
import DoYouKnowPopup from "./DoYouKnowPopup";
import server_url from "../define/Url"
import TodayItem from "./TodayItem";
import ScrollButton from "../common/ScrollButton"
import { connect } from "react-redux"; //redux store에 연결해주는 API

/**
 *  오늘 벙어리 화면
 */
class TodayMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: this.props.today, //오늘 날짜
            list: [], //조회 전체 결과 리스트
            view: [], //화면에 보여질 결과 리스트
            isPopup: false, //너그거아니 팝업 여부
            isSuccess: false, //response 성공 여부
            page: 0,
            pageSize: 10,
            isMore: true,
        }
    }

    componentDidMount() {
        if(!this.props.isAuth) {
            alert("로그인 후 사용해주세요.")
            //로그인 페이지로
            this.props.history.push("/login")
        }
        this.setState({today: this.props.today})
        this.searchOnClick()
    }

    /**
     * 팝업 동작 여부
     **/
    doYouKnowPopup = () => {
        this.setState({isPopup: !this.state.isPopup})
    }

    /**
     * 날짜 변경 동작
     */
    inputDateHandler = (e) => {
        this.setState({today: e.target.value})
    }

    /**
     * 검색어 입력 동작
     */
    inputContentHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    /**
     * 오늘 벙어리 조회 서버 요청 API
     */
    searchOnClick = () => {
        axios.get(server_url + "/today/list", {params: {
                today: this.state.today
                , schContent: this.state.schContent
            }})
            .then(res => {
                this.setState({list: res.data.data, view: [], page: 0});
                this.moreView()
            })
            .catch(err => console.log(err));
    }

    /**
     * id 내림차순 정렬 함수
     */
    listSort = () => {
        this.setState({list: this.state.list.sort((a, b) => {
            //id 내림차순으로 정렬
            return b.id - a.id;
            //id 오름차순으로 정렬
            // return a.id - b.id;
            })
        })
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
            <div className="todaybox"> 
                <div className="today">
                <span className="mutter-icon"></span>
                <span className="today-title"> 오늘 벙어리 </span>
                </div>
                <div>
                    <button className="button-wide1" onClick={this.doYouKnowPopup}> 너 그거 아니?</button>
                </div>
                <div>
                    {this.state.isPopup &&
                    <div>
                        <DoYouKnowPopup
                            doYouKnowPopup={this.doYouKnowPopup}
                            searchOnClick={this.searchOnClick}
                        />
                    </div>
                    }
                </div>
                <div className="todayclass">
                    <input type="date" value={this.state.today} onChange={this.inputDateHandler}></input>
                    <div className="today-search">
                    <input type="text" value={this.state.schContent} onChange={this.inputContentHandler} />
                    <button className="button-small1" onClick={this.searchOnClick} >검색</button>
                    </div>
                </div>
                <div className="contents-list-style">
                    <div className="newlist">
                        {this.state.view.map((item, idx) =>
                            <TodayItem
                                item={item}
                                key={idx}
                                searchOnClick={this.searchOnClick}
                                today={this.state.today}
                            />
                        )}
                    </div>
                    <div>
                    {this.state.list.length > 10 && this.state.isMore &&
                        <button className="button-wide1" onClick={this.moreView}>More</button>
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
        );
    }
}
//store의 state를 컴포넌트의 props에 매핑
const mapStateToProps = (state) => ({
    id: state.user.id,
    token: state.user.token,
    isAuth: state.user.isAuth,
})
export default withRouter(connect(mapStateToProps)(TodayMain));