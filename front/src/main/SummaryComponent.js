import React, { Component } from 'react';
import "./MainStyle.css"
import axios from "axios";
import server_url from "../define/Url";
import TodayContents from "../today/TodayContents";

/**
 * 디폴트 컴퍼넌트
 */
class SummaryComponent extends Component {

    state = {
        today: [
            {
                id: 3,
                content: 'content3',
                registerDate: '2021-03-05',
                likes: 0,
                dislikes: 0,
                reports: 0,
            },
            {
                id: 4,
                content: 'content4',
                registerDate: '2021-03-05',
                likes: 0,
                dislikes: 0,
                reports: 0,
            },
            {
                id: 5,
                content: 'content5',
                registerDate: '2021-03-05',
                likes: 0,
                dislikes: 0,
                reports: 0,
            }
        ],
        isSuccess: false,
        popular: []
    }

    componentDidMount() {
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

    todayGetApi = () => {
        axios.get(server_url + "/today/contentsTop5", /*{params: {schContent: this.state.schContent}}*/)
            .then(res => {
                this.setState({
                    today: res.data.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
    }

    popularGetApi = () => {
        axios.get(server_url + "/popular/contentsTop5", /*{params: {schContent: this.state.schContent}}*/)
            .then(res => {
                this.setState({
                    popular: res.data.data,
                    isSuccess:true
                });
            })
            .catch(res => console.log(res))
    }

    listSort = (flag) => {
        if(flag === 1) {
            this.setState({
                today: this.state.today.sort((a, b) => {
                    //id 내림차순으로 정렬
                    return b.id - a.id;
                    //id 오름차순으로 정렬
                    // return a.id - b.id;
                })
            })
        } else if(flag === 2) {
            this.setState({
                popular: this.state.popular.sort((a, b) => {
                    //id 내림차순으로 정렬
                    return b.id - a.id;
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
                    New 몇개 Today 몇개
                </div>
                <div>
                    <div className="today-summary-title">
                        오늘 벙어리 최신글
                    </div>
                    <div>
                        {this.state.today.map((item, idx) =>
                            idx < 5 &&
                            <TodayContents
                                item={item}
                                key={idx}
                                searchOnClick={this.searchOnClick}
                            />
                        )}
                    </div>
                </div>
                <div>
                    <div className="today-summary-title">
                        인기 벙어리 Top 5
                    </div>
                    <div>
                        {this.state.popular.map((item, idx) =>
                            idx < 5 &&
                            <TodayContents
                                item={item}
                                key={idx}
                                searchOnClick={this.searchOnClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default SummaryComponent;