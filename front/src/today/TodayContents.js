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

    likeOnClick = () => {
        let plus = !this.state.likesFlag
        this.setState({likesFlag: plus})
        // axios.post(server_url + "/today/content/likes", {id: this.props.item.id, flag: plus})
        //     .then(res => {
        //         alert("좋아요")
        //         this.setState({likesFlag: plus})
        //         this.props.searchOnClick()
        //     })
        //     .catch(res => console.log(res))
    }

    dislikeOnClick = () => {
        let plus = !this.state.dislikesFlag
        this.setState({dislikesFlag: plus})
        // axios.post(server_url + "/today/content/dislikes", {id: this.props.item.id, flag: plus})
        //     .then(res => {
        //         alert("좋아요")
        //         this.setState({dislikesFlag: plus})
        //         this.props.searchOnClick()
        //     })
        //     .catch(res => console.log(res))
    }

    reportsOnClick = () => {
        let plus = !this.state.reportsFlag
        this.setState({reportsFlag: plus})
        // axios.post(server_url + "/today/content/reports", {id: this.props.item.id, flag: plus})
        //     .then(res => {
        //         alert("좋아요")
        //         this.setState({reportsFlag: plus})
        //         this.props.searchOnClick()
        //     })
        //     .catch(res => console.log(res))
    }

    render() {
        return (
            <div>
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