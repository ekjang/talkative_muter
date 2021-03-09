import React, { Component } from 'react';
import axios from "axios";
import "./TodayStyle.css"
import DoYouKnowPopup from "./DoYouKnowPopup";
import server_url from "../define/Url"
import TodayContents from "./TodayContents";

/**
 * 오늘 벙어리 컴퍼넌트
 */
class TodayComponent extends Component {

    constructor(props) {
        super(props);
        let today = new Date().toISOString().substr(0, 10);
        this.state = {
            // schContent: '', //필터 입력변수
            today: today,
            list: [],
            doYouKnow: false, //popup 여부
            isSuccess: false, //response 성공 여부
            viewFlag: 1
        }
    }

    componentDidMount() {
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
        let {schContent, today} = this.state
        if(date === undefined) {
            searchDate = today
        } else {
            searchDate = date
        }
        console.log("searchOnClick!!"+schContent, today)
        axios.get(server_url + "/today/contents",
            {params:
                    {schContent: this.state.schContent,
                    today: searchDate /*this.state.today*/
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
        console.log("render")
        return (
            <div>
                <div className="today-title">
                    오늘 벙어리
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
                <div>
                    <input type="date" value={this.state.today} onChange={this.inputDateHandler}></input>
                    <input type="text" value={this.state.schContent} onChange={this.inputContentHandler} />
                    <button className="button-small1" onClick={this.searchOnClick} >검색</button>
                </div>
                <div className="contents-list-style">
                    {this.state.list.map((item, idx) =>
                    <TodayContents
                        item={item}
                        key={idx}
                        searchOnClick={this.searchOnClick}
                        viewFlag={this.state.viewFlag}
                    />
                    )}
                </div>
            </div>
        );
    }
}
export default TodayComponent;