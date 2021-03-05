import React, { Component } from 'react';
import axios from "axios";
import "./TodayStyle.css"
import DoYouKnowPopup from "./DoYouKnowPopup";
import server_url from "../config/Url"
import TodayContents from "./TodayContents";
class TodayComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // schContent: '', //필터 입력변수
            list: [],
            doYouKnow: false, //popup 여부
            isSuccess: false //response 성공 여부
        }
    }

    componentDidMount() {
        this.searchOnClick()
    }

    doYouKnowPopup = () => {
        this.setState({doYouKnow: !this.state.doYouKnow})
    }

    inputHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    searchOnClick = () => {
        axios.get(server_url + "/today/contents", /*{params: {schContent: this.state.schContent}}*/)
            .then(res => {
                this.setState({
                    list: res.data.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
        this.sortList()
    }

    sortList = () => {
        this.state.list.map((item, idx) => {
            console.log(idx)
            return idx
        })
    }

    render() {
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
                    <input type="text" value={this.state.schContent} onChange={this.inputHandler} />
                    <button className="button-small1" onClick={this.searchOnClick} >검색</button>
                </div>
                <div>
                    <div>
                        Content list
                    </div>
                    {this.state.list.map((item, idx) =>
                    <TodayContents
                        item={item}
                        key={idx}
                    />
                    )}
                </div>
            </div>
        );
    }
}
export default TodayComponent;