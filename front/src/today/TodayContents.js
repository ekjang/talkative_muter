import React, { Component } from 'react';
import "./TodayStyle.css"
import axios from "axios";
import server_url from "../config/Url";

/**
 * 오늘 벙어리 한 줄 컴퍼넌트
 */
class TodayContents extends Component {
    state = {
        likesFlag: false,
        dislikesFlag: false,
        reportsFlag: false
    }
    componentDidMount() {
        this.localStorageGetData()
    }

    localStorageGetData = () => {
        let like = localStorage.getItem('likesFlag_'+this.props.item.id)
        let dislike = localStorage.getItem('dislikesFlag_'+this.props.item.id)
        let report = localStorage.getItem('reportsFlag_'+this.props.item.id)

        this.setState({likesFlag: (like === null ? false : like)
            , dislikesFlag: (dislike === null ? false : dislike)
            , reportsFlag: (report === null ? false : report)
        })
    }

    likeOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.likesFlag
        this.setState({likesFlag: plus})
        if(plus) {
            localStorage.setItem('likesFlag_' + this.props.item.id, JSON.stringify(plus))
        } else {
            localStorage.removeItem('likesFlag_'+this.props.item.id)
        }
        axios.put(server_url + "/today/content/like/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({likesFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
        this.props.searchOnClick()
    }

    dislikeOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.dislikesFlag
        this.setState({dislikesFlag: plus})
        if(plus) {
            localStorage.setItem('dislikesFlag_' + this.props.item.id, JSON.stringify(plus))
        } else {
            localStorage.removeItem('dislikesFlag_'+this.props.item.id)
        }
        axios.put(server_url + "/today/content/dislike/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({dislikesFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
        this.props.searchOnClick()
    }

    reportsOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.reportsFlag
        this.setState({reportsFlag: plus})
        if(plus) {
            localStorage.setItem('reportsFlag_' + this.props.item.id, JSON.stringify(plus))
        } else {
            localStorage.removeItem('reportsFlag_'+this.props.item.id)
        }
        axios.put(server_url + "/today/content/report/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({reportsFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
        this.props.searchOnClick()
    }

    render() {
        return (
            <div>
                <span className="content-item1">
                    {this.props.item.id}
                </span>
                <span className="content-item1">
                    {this.props.item.content}
                </span>
                <span className="content-item2">
                    {this.props.item.registerDate}
                </span>
                <span className={"content-icon-"+this.state.likesFlag}>좋아</span><span className="content-item1" onClick={this.likeOnClick}>{this.props.item.likes}</span>
                <span className={"content-icon-"+this.state.dislikesFlag}>싫어</span><span className="content-item1" onClick={this.dislikeOnClick}>{this.props.item.dislikes}</span>
                <span className={"content-icon-"+this.state.reportsFlag}>신고</span><span className="content-item1" onClick={this.reportsOnClick}>{this.props.item.reports}</span>
            </div>
        );
    }
}

export default TodayContents