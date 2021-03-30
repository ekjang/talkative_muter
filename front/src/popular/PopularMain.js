import React, { Component } from 'react';
import "./PopularStyle.css"
import axios from "axios";
import server_url from "../define/Url";
import PopularItem from "./PopularItem";
import { connect } from "react-redux";


/**
 * 인기 벙어리 화면
 */
class PopularMain extends Component {
    state = {
        today: this.props.today, //오늘 날짜
        week: 0, //이번 주 날짜 정보??
        list: [], //조회 결과 리스트
        sizeByPage: 0, //미 로그인 시 아이템 수 제한
    }

    componentDidMount() {
        if(!this.props.isAuth) {
            alert("로그인 하지 않을 경우 인기 벙어리는 8개까지만 표시됩니다.")
            this.setState({sizeByPage: 8})
        }
        this.searchOnClick()
    }

    /**
     * 입력 동작
     * @param e
     */
    inputHandler = (e) => {
        this.setState({schContent: e.target.value})
    }

    /**
     * 인기 벙어리 조회 서버 요청 API
     * @param date
     */
    searchOnClick = (date) => {
        let searchDate = ''
        let {today} = this.state
        if(date === undefined) {
            searchDate = today
        } else {
            searchDate = date
        }
        axios.get(server_url + "/popular/list",
            {params:
                    {
                        today: searchDate
                    }})
            .then(res => {
                this.setState({
                    list: this.listSort(res.data.data),
                    // list: res.data.data,
                });
            })
            .catch(res => console.log(res))
    }

    /**
     * !!!! 여긴 변경해야함.
     * 좋아요 내림차순 정렬 함수
     */
    listSort = (data) => {
        //사이즈만큼만 보이기
        if(this.state.sizeByPage > 0 && data.length > this.state.sizeByPage) {
            return data.slice(0, this.state.sizeByPage)
        }
        return (data.sort((a, b) => {
            //status 내림차순으로 정렬
            return b.likes - a.likes;
        }))
    }

    render() {
        return (
            <div className="popbox">

                <div className="popular">
                         <span className="mutter-icon"></span>
                         <span className="popular-title"> 인기 벙어리 </span>
                </div>
                <div className="contents-list-style">
                  <div className="newlist">
                    {this.state.list.map((item, idx) =>
                        <PopularItem
                            item={item}
                            key={idx}
                            searchOnClick={this.searchOnClick}
                            today={this.state.today}
                            week={this.state.week}
                        />
                    )}
                  </div>
                </div>
                
 
            </div>
                
        );
    }
}

//store의 state를 컴포넌트의 props에 매핑
const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
})

export default connect(mapStateToProps)(PopularMain);