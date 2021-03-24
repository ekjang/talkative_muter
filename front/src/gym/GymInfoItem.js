import React, { Component } from "react";
import axios from "axios";
import server_url from "../define/Url";
import {withRouter} from "react-router-dom";
import "./GymStyle.css";
// import {NoticeGym} from "../notice/NoticeGym";

/**
 * 헬스장 이용정보 아아템 컴퍼넌트
 */
class GymInfoItem extends Component {

    /**
     * 사용여부 동작
     * 상태 갱신 서버 요청 API
     */
    useOnClick = () => {
        if(!this.props.isAuth) {
            alert("로그인 후 사용해주세요.")
            this.props.history.push("/login")
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
                axios.put(server_url + "/gym-info/use/" + this.props.item.id, {use: use, memberId: localStorage.getItem('id')})
                    .then(res => {
                        if(res.data.success) {
                            alert("[ " + useMessage + " ] 처리 되었습니다.")
                        }
                        this.props.searchOnClick()
                    })
                    .catch(err => {
                            if (err.response) {
                                alert(err.response.data.message)
                            } else {
                                console.error(err)
                            }
                        }
                    )
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
                        <table cellSpacing="0" cellPadding="0">
                            <tbody>
                            <tr>
                                <td rowSpan="2"><span>{this.props.item.id}</span></td>
                                <td rowSpan="2"> <span
                                    className={"gym-gender-" + this.props.item.gender}> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                     </span></td>
                                <td><span>{this.props.item.membershipNumber}</span></td>
                                <td rowSpan="2">
                                    <span className={"gym-item-style-" + this.props.item.usingStatus}
                                                      onClick={this.useOnClick}>
                                                    {status}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><span className="enttime">{this.props.item.entranceTime}</span></td>
                            </tr>
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(GymInfoItem);