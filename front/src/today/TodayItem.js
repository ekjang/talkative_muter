import React, { Component } from 'react';
import "./TodayStyle.css"
import axios from "axios";
import server_url from "../define/Url";

/**
 * 오늘 벙어리 한 줄 컴퍼넌트
 */
class TodayItem extends Component {
    state = {
        likesFlag: false,
        dislikesFlag: false,
        reportsFlag: false
    }
    componentDidMount() {
        this.localStorageGetData()
    }

    /**
     * 로컬 스토리지 클릭 정보 가져오기
     */
    localStorageGetData = () => {
        let like = localStorage.getItem('likesFlag_'+this.props.item.id)
        let dislike = localStorage.getItem('dislikesFlag_'+this.props.item.id)
        let report = localStorage.getItem('reportsFlag_'+this.props.item.id)

        this.setState({likesFlag: (like === null ? false : like)
            , dislikesFlag: (dislike === null ? false : dislike)
            , reportsFlag: (report === null ? false : report)
        })
    }

    /**
     * 좋아 클릭 정보 동작
     * @param e
     */
    likeOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.likesFlag
        this.setState({likesFlag: plus})
        if(plus) {
            localStorage.setItem('likesFlag_' + this.props.item.id, JSON.stringify(plus))
        } else {
            localStorage.removeItem('likesFlag_'+this.props.item.id)
        }
        //date 추가해야될듯
        axios.put(server_url + "/today/content/like/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({likesFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
    }

    /**
     * 싫어 클릭 정보 동작
     * @param e
     */
    dislikeOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.dislikesFlag
        this.setState({dislikesFlag: plus})
        if(plus) {
            localStorage.setItem('dislikesFlag_' + this.props.item.id, JSON.stringify(plus))
        } else {
            localStorage.removeItem('dislikesFlag_'+this.props.item.id)
        }
        //date 추가해야될듯
        axios.put(server_url + "/today/content/dislike/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({dislikesFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
    }

    /**
     * 신고 클릭 정보 동작
     * @param e
     */
    reportsOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.reportsFlag
        this.setState({reportsFlag: plus})
        if(plus) {
            localStorage.setItem('reportsFlag_' + this.props.item.id, JSON.stringify(plus))
        } else {
            localStorage.removeItem('reportsFlag_'+this.props.item.id)
        }
        //date 추가해야될듯
        axios.put(server_url + "/today/content/report/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({reportsFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
    }

    render() {
        return (
            <div>
                <span className="content-item0">
                    {this.props.item.id}
                </span>
                <span className="content-item1">
                    {this.props.item.content}
                </span>
                <span className="content-item2" dataformatas="YYYY-MM-DD HH:mm:ss">
                    {this.props.item.registerDate}
                </span>
                <span className="tagclass">
                    <span className={"content-icon-" + this.state.likesFlag}>좋아</span>
                    <span className="content-item3" onClick={this.likeOnClick}>{this.props.item.likes}</span>
                    <span className={"content-icon-" + this.state.dislikesFlag}>싫어</span>
                    <span className="content-item3" onClick={this.dislikeOnClick}>{this.props.item.dislikes}</span>
                    <span className={"content-icon-" + this.state.reportsFlag}>신고</span>
                    <span className="content-item3" onClick={this.reportsOnClick}>{this.props.item.reports}</span>
                </span>
            </div>
        );
    }
}
export default TodayItem