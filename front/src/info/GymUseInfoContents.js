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
            if (parseInt(this.props.item.usingStatus) == 1) {
                use = 0
                useMessage = '반납'
            } else if (parseInt(this.props.item.usingStatus) == 0) {
                use = 1
                useMessage = '사용'
            }

            if(window.confirm(useMessage + " 하시겠습니까?")) {
                axios.put(server_url + "/gym-info/use/" + this.props.item.id, {use: use})
                    .then(res => {
                        console.log(res.data)
                        this.props.searchOnClick()
                    })
                    .catch(res => console.log(res))
            } else {
                return
            }
        }
    }

    render() {
        let status = (parseInt(this.props.item.usingStatus) === 1) ? "사용불가" : "사용가능"
        return (
            <div>
                <div className="gymbox1 gym-item-style">
                    <div className="gym-item-style">
                        <span>{this.props.item.id}</span>
                        <span className={"gym-gender-" + this.props.item.gender}>
                        &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                        </span>                       
{/*                         <span className="gym-gender-">{this.props.item.gender}</span> */}
                        <span>{this.props.item.membershipNumber}</span>
                        <span className={"gym-item-style-" + this.props.item.usingStatus} onClick={this.useOnClick}>
                            {status}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(GymUseInfoContents);