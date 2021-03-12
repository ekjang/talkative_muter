import React, { Component } from 'react';
import "./PopularStyle.css"
import axios from "axios";
import server_url from "../define/Url";
import TodayContents from "../today/TodayContents";


/**
 * 인기 벙어리 컴퍼넌트
 */
class PopularComponent extends Component {
    state = {
        today: this.props.today,
        week: '',
        list: [],
        viewFlag: 0,
        sizeByPage: '',
        schContent: ''
    }

    componentDidMount() {
        if(!this.props.isAuthentication) {
            this.setState({sizeByPage: 10})
        }
        this.searchOnClick()
    }

    inputHandler = (e) => {
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
        axios.get(server_url + "/today/list", /////서버 구현되면 popular 로 바꿔야함.
            {params:
                    {schContent: this.state.schContent,
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

    listSort = (data) => {
        //사이즈만큼만 보이기
        if(data.length > this.state.sizeByPage) {
            console.log(data.length)
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
                <div>
                    {this.props.isAuthentication &&
                    <div className="popcontent">
                        내용 &nbsp; <input type="text" value={this.state.schContent} onChange={this.inputHandler}/>
                        <button className="popbtn" onClick={this.searchOnClick}>검색</button>
                    </div>
                    }
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
export default PopularComponent;