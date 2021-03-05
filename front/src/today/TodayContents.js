import React, { Component } from 'react';
import "./TodayStyle.css"
import axios from "axios";
import server_url from "../config/Url";

class TodayContents extends Component {
    state = {
        likesFlag: false,
        dislikesFlag: false,
        reportsFlag: false
    }
    componentDidMount() {
    }

    likeOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.likesFlag
        const {likesFlag} = this.state
        localStorage.setItem('likesFlag_'+this.props.item.id, JSON.stringify(likesFlag))
        axios.put(server_url + "/today/content/like/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({likesFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
        ///////////////////
        console.log("storeage:"+localStorage.getItem('likesFlag_'+this.props.item.id))
    }

    dislikeOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.dislikesFlag
        this.setState({dislikesFlag: plus})
        const {dislikesFlag} = this.state
        localStorage.setItem('dislikesFlag_'+this.props.item.id, JSON.stringify(dislikesFlag))
        axios.put(server_url + "/today/content/dislike/"+this.props.item.id, {flag: plus})
            .then(res => {
                this.setState({dislikesFlag: plus})
                this.props.searchOnClick()
            })
            .catch(res => console.log(res))
    }

    reportsOnClick = (e) => {
        e.preventDefault()
        let plus = !this.state.reportsFlag
        this.setState({reportsFlag: plus})
        const {reportsFlag} = this.state
        localStorage.setItem('reportsFlag_'+this.props.item.id, JSON.stringify(reportsFlag))
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