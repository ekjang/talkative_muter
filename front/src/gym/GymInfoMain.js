import React, { Component } from "react";
import axios from "axios";
import server_url from "../define/Url";
import GymInfoItem from "./GymInfoItem";

/**
 * 헬스장 이용정보 화면
 */
class GymInfoMain extends Component {
    state = {
        list: [], //리스트
        statue: false //사용 여부
    }

    componentDidMount() {
        this.searchOnClick()
    }

    /**
     * 헬스장 이용정보 서버 요청 API
     */
    searchOnClick = () => {
        axios.get(server_url + "/gym-info/list")
            .then(res => {
                this.setState({
                    list: this.listSort(res.data.data),
                });
            })
            .catch(res => console.log(res))
    }

    /**
     * 상태 오름차순 정렬 함수
     * @param data
     */
    listSort = (data) => {
        return (data.sort((a, b) => {
            //status 오름차순으로 정렬
            return a.usingStatus - b.usingStatus;
        }))
    }

    render() {
        return (
            <div>
                <div>
                {this.state.list.map((item, idx) =>
                    <GymInfoItem
                        item={item}
                        key={idx}
                        searchOnClick={this.searchOnClick}
                        isAuth={this.props.isAuth}
                    />
                )}
                </div>
            </div>
        );
    }
}
export default GymInfoMain;