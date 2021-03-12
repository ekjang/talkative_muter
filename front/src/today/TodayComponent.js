import React, { Component } from 'react';
import axios from "axios";
import "./TodayStyle.css"
import {withRouter} from "react-router-dom";
import DoYouKnowPopup from "./DoYouKnowPopup";
import server_url from "../define/Url"
import TodayContents from "./TodayContents";

/**
 *  벙어리 컴퍼넌트
 */
class TodayComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            today: this.props.today,
            list: [],
            doYouKnow: false, //popup 여부
            isSuccess: false, //response 성공 여부
            viewFlag: 1
        }
    }

    componentDidMount() {
        if(!this.props.isAuthentication) {
            alert("로그인 후 사용해주세요.")
            this.props.history.push("/login")
        }
        this.setState({today: this.props.today})
        this.searchOnClick()
    }

    doYouKnowPopup = () => {
        this.setState({doYouKnow: !this.state.doYouKnow})
    }

    inputDateHandler = (e) => {
        this.setState({today: e.target.value})
        this.searchOnClick(e.target.value)
    }

    inputContentHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    searchOnClick = (date) => {
        let searchDate = ''
        let {today} = this.state
        if(date === undefined) {
            searchDate = today
        } else {
            searchDate = date
        }
        axios.get(server_url + "/today/list",
            {params:
                    {schContent: this.state.schContent,
                    today: searchDate
                    }})
            .then(res => {
                this.setState({
                    list: res.data.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
        this.listSort()
    }

    listSort = () => {
        this.setState({list: this.state.list.sort((a, b) => {
            //id 내림차순으로 정렬
            return b.id - a.id;
            //id 오름차순으로 정렬
            // return a.id - b.id;
            })
        })
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
                    {this.state.doYouKnow &&
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
                    {/*<input type="text" value={this.state.schContent} onChange={this.inputContentHandler} />*/}
                    <button className="button-small1" onClick={this.searchOnClick} >검색</button>
                </div>
                <div className="contents-list-style">
                    <div className="newlist">
                    {this.state.list.map((item, idx) =>
                    <TodayContents
                        item={item}
                        key={idx}
                        searchOnClick={this.searchOnClick}
                        today={this.state.today}
                        viewFlag={this.state.viewFlag}
                    />
                    )}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(TodayComponent);