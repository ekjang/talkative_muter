import React, { Component } from 'react';
import axios from "axios";
import "./MainStyle.css"
import server_url from "../define/Url";
import {Link} from "react-router-dom";
import SummaryItem from "./SummaryItem";

/**
 * 홈 메뉴
 */
class Summary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todayList: [], //오늘 벙어리 리스트
            popularList: [], //인기 벙어리 리스트
            newCount: 0, //새글 갯수
            totalCount: 0, //오늘 전체 갯수
            limit: 5 //리스트 제한 수
        }
    }

    componentDidMount() {
        this.newCountGetApi() //10분 간 등록된 글 갯수
        this.todayCountGetApi() //오늘 등록된 글 갯수
        this.todayList() //오늘 벙어리 최근 5
        this.popularList() //인기 벙어리 Top 5

        // FcmMessageCall() //현재 aws 에서 처리 안됨.ㅠ

        // setInterval(async => {
        //     this.newCountGetApi() //10분 간 등록된 글 갯수
        //     if(this.state.newCount > 0) {
        //         NoticeNew()
        //     }
        // }, 3*60*60*1000)
    }

    // testFcm = () => {
    //     const serverKey = "AAAA0Q6ZQic:APA91bESpxUpkxDrzhDI4gOP5mx1Ej0nk1jGkYwZHSEA1AphNiqeBRh0xw-Kgb_fHU6HqmKndnyQAiigmjvUzDmK-ZmRrJaCuCiF3FD2BJlnOmph5p_RbSrqC-YucJupx6QAfOFflE4w"
    //
    //     const option = {
    //         method: 'POST',
    //         url: 'https://fcm.googleapis.com/fcm/send', //FCM서버의 주소입니다. 그대로 쓰시면 됩니다.
    //         json: {
    //             'to': "e3R32EXnr9Nd9-cWJQNqNC:APA91bFLNiS0uVA2LrpLhaEdyG_F8hrxGRCuyhRwdBVtVIjUg_QM1SIqZsmIzJYkhcjVk3NDW6GJBsHEkjg6jmumvodGVQv_nNDqkZI_KMstaGSIEKL9u4zRRg8vzDB6c5je9ZlhnPt1", //2-2에서 복사해놓은 토큰을 사용합니다.
    //             'notification': { //꼭 notification일 필요는 없습니다. data든 뭐든 바꿔도 됩니다.
    //                 'title': '말.많.벙', //알림의 제목에 해당하는 부분입니다.
    //                 'body': 'test!', //알림의 본문에 해당하는 부분입니다.
    //             }
    //         },
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'key=' + serverKey //위에서 찾았던 서버키 앞에 'key='을 붙여서 사용합니다.
    //         }
    //     }
    //
    //     axios(option).then(res => {
    //         console.log(res)
    //     });
    // }

    /**
     * 오늘 벙어리 최근 5
     */
    todayList = () => {
        this.todayGetApi()
        this.listSort(1)
    }

    /**
     * 인기 벙어리 Top 5
     */
    popularList = () => {
        this.popularGetApi()
        this.listSort(2)
    }

    /**
     * 10분 간 등록된 글 갯수
     */
    newCountGetApi = () => {
        axios.get(server_url + "/today/newCount")
            .then(res => {
                this.setState({
                    newCount: res.data,
                });
            })
            .catch(res => console.log(res))
    }

    /**
     * 오늘 등록된 글 갯수
     */
    todayCountGetApi = () => {
        axios.get(server_url + "/today/todayCount",
            {params:
                    {
                        today: this.props.today
                    }})
            .then(res => {
                this.setState({
                    totalCount: res.data,
                });
            })
            .catch(res => console.log(res))
    }

    /**
     * 오늘 벙어리 서버 호출 API
     */
    todayGetApi = () => {
        axios.get(server_url + "/today/contentsLimit",
            {params:
                    {limit: this.state.limit,
                        today: this.props.today
                    }})
            .then(res => {
                this.setState({
                    todayList: res.data.data,
                });
            })
            .catch(res => console.log(res))
    }

    /**
     * 인기 벙어리 서버 호출 API
     */
    popularGetApi = () => {
        axios.get(server_url + "/popular/contentsLimit",
            {params:
                    {limit: this.state.limit,
                        today: this.props.today
                    }})
            .then(res => {
                this.setState({
                    popularList: res.data.data,
                });
            })
            .catch(res => console.log(res))
    }

    /**
     * !!! 여긴 변경해야됨.
     * 내림차순 정렬 함수
     * @param flag
     *  - 1: id 내림차순
     *  - 2: 좋아요 내림차순
     */
    listSort = (flag) => {
        if(flag === 1) {
            this.setState({
                today: this.state.todayList.sort((a, b) => {
                    //id 내림차순으로 정렬
                    return b.id - a.id;
                })
            })
        } else if(flag === 2) {
            this.setState({
                popular: this.state.popularList.sort((a, b) => {
                    //id 내림차순으로 정렬
                    return b.likesFlag - a.likesFlag;
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
                            <SummaryItem
                                item={item}
                                key={idx}
                            />
                        )}
                    </div>
                </div>
                <div className="mainbox1">
                    <div className="today-summary">
                        <span className="mutter-icon"></span>
                        <span className="today-summary-title"> 인기 벙어리 Top 5 </span>

                        {this.state.popularList.length > 0 &&
                        <span className="more-text"><Link to="/popular">더보기 +</Link></span>
                        }
                        
                    </div>
                    <div className="newlist">
                        {this.state.popularList.map((item, idx) =>
                            idx < 5 &&
                            <SummaryItem
                                item={item}
                                key={idx}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
export default Summary;