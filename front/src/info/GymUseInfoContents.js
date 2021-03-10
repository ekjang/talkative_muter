import React, { Component } from "react";
import axios from "axios";
import server_url from "../define/Url";
import "./GymStyle.css";

class GymUseInfoContents extends Component {
    //사용 / 미사용 동작
    useOnClick = () => {
        if(!this.props.isAuthentication) {
            alert("회사메일 인증 후 사용할 수 있습니다.")
            return
        } else {
            let use = 0
            if (this.props.item.status == 1) {
                use = 0
            } else if (this.props.item.status == 0) {
                use = 1
            }
            console.log(!this.props.item.status)
            axios.put(server_url + "/gymInfo/statue/" + this.props.item.id, {statue: use})
                .then(res => {
                    // this.setState({statue: use})
                    this.props.searchOnClick()
                })
                .catch(res => console.log(res))
        }
    }

    render() {
        let statue = (this.props.item.status === 1) ? "사용중" : "사용안함"
        return (
            <div className="gym-item-style">
                <div></div>
                <span>{this.props.item.id}</span>
                <span>{this.props.item.number}</span>
                <span class={"gym-item-style-" + this.props.item.status} onClick={this.useOnClick}>
                    {statue}
                </span>
            </div>
        );
    }
}
export default GymUseInfoContents;