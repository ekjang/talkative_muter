import React, { Component } from 'react';
import "./MainStyle.css"
import axios from "axios";
import server_url from "../define/Url";
import TodayContents from "../today/TodayContents";
import BottomTextComponent from "./BottomTextComponent";
import {Link} from "react-router-dom";

/**
 * 디폴트 컴퍼넌트
 */
class SummaryComponent extends Component {

    state = {
        todayList: [],
        popularList: [],
        isSuccess: false,
        newCount: 0,
        totalCount: 0,
        viewFlag: 0,
        limit: 5
    }

    componentDidMount() {
        this.newCountGetApi()
        this.todayCountGetApi()
        this.todaySearchOnClick()
        this.popularSearchOnClick()
    }

    todaySearchOnClick = () => {
        this.todayGetApi()
        this.listSort(1)
    }

    popularSearchOnClick = () => {
        this.popularGetApi()
        this.listSort(2)
    }

    newCountGetApi = () => {
        axios.get(server_url + "/today/newCount")
            .then(res => {
                this.setState({
                    newCount: res.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
    }

    todayCountGetApi = () => {
        axios.get(server_url + "/today/todayCount",
            {params:
                    {
                        today: this.props.today
                    }})
            .then(res => {
                this.setState({
                    totalCount: res.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
    }

    todayGetApi = () => {
        axios.get(server_url + "/today/contentsLimit",
            {params:
                    {limit: this.state.limit,
                        today: this.props.today
                    }})
            .then(res => {
                this.setState({
                    todayList: res.data.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
    }

    popularGetApi = () => {
        axios.get(server_url + "/popular/contentsLimit",
            {params:
                    {limit: this.state.limit,
                        today: this.props.today
                    }})
            .then(res => {
                this.setState({
                    popularList: res.data.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
    }

    listSort = (flag) => {
        if(flag === 1) {
            this.setState({
                today: this.state.todayList.sort((a, b) => {
                    //id 내림차순으로 정렬
                    return b.id - a.id;
                    //id 오름차순으로 정렬
                    // return a.id - b.id;
                })
            })
        } else if(flag === 2) {
            this.setState({
                popular: this.state.popularList.sort((a, b) => {
                    //id 내림차순으로 정렬
                    return b.likesFlag - a.likesFlag;
                    //id 오름차순으로 정렬
                    // return a.id - b.id;
                })
            })
        }
    }

    render() {
        return (
            <div>
                <div className="summary-count">
                    New {this.state.newCount} &nbsp; &nbsp; Today {this.state.totalCount}
                </div>
                <div className="mainbox1">
                     <div className="today-summary">
                         <span className="mutter-icon"></span>
                         <span className="today-summary-title"> 오늘 벙어리 최신글 </span>

                         {this.state.todayList.length > 0 &&
                         <span className="more-text"><Link to="/today">더보기 +</Link></span>
                         }
                    </div>
                    <div className="newlist">
                        {this.state.todayList.map((item, idx) =>
                            <TodayContents
                                item={item}
                                key={idx}
                                searchOnClick={this.searchOnClick}
                                viewFlag={this.viewFlag}
                            />
                        )}
                    </div>
                </div>
                <div className="mainbox1">
                    <div className="today-summary">
                            <span className="mutter-icon"></span>
                            <span className="today-summary-title"> 인기 벙어리 Top 5 </span>
                        
                    </div>
                    <div className="newlist">
                        {this.state.popularList.map((item, idx) =>
                            idx < 5 &&
                            <TodayContents
                                item={item}
                                key={idx}
                                searchOnClick={this.searchOnClick}
                                viewFlag={this.state.viewFlag}
                            />
                        )}
                    </div>
                </div>
                <BottomTextComponent />
            </div>
        );
    }
}
export default SummaryComponent;