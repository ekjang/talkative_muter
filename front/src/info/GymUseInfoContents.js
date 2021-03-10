import React, { Component } from "react";
import axios from "axios";
import server_url from "../define/Url";
import {withRouter} from "react-router-dom";
import "./GymStyle.css";

class GymUseInfoContents extends Component {
    //사용 / 미사용 동작
    useOnClick = () => {
        if(!this.props.isAuthentication) {
            alert("회사메일 인증 후 사용해주세요.")
            this.props.history.push("/companyAuth")
        } else {
            let use = 0
            let useMessage = '사용'
            if (parseInt(this.props.item.status) == 1) {
                use = 0
                useMessage = '반납'
            } else if (parseInt(this.props.item.status) == 0) {
                use = 1
                useMessage = '사용'
            }

            if(window.confirm(useMessage + " 하시겠습니까?")) {
                axios.put(server_url + "/gymInfo/statue/" + this.props.item.id, {statue: use})
                    .then(res => {
                        // this.setState({statue: use})
                        this.props.searchOnClick()
                    })
                    .catch(res => console.log(res))
            } else {
                return
            }
        }
    }

    render() {
        let statue = (this.props.item.status === 1) ? "사용중" : "사용안함"
        return (
            <div className="gymbox1">
                <div className="gym-item-style">
                    
                    <span>{this.props.item.id}</span>
                    <span>{this.props.item.number}</span>
                    <span class={"gym-item-style-" + this.props.item.status} onClick={this.useOnClick}>
                        {statue}
                    </span>
                </div>
            </div>
        );
    }
}
export default withRouter(GymUseInfoContents);