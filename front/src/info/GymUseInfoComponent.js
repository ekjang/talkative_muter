import React, { Component } from "react";
import axios from "axios";
import server_url from "../define/Url";
import GymUseInfoContents from "./GymUseInfoContents";

class GymUseInfoComponent extends Component {
    state = {
        list: [],
        statue: false
    }

    componentDidMount() {
        this.searchOnClick()
    }

    searchOnClick = () => {
        axios.get(server_url + "/gym-info/list")
            .then(res => {
                this.setState({
                    list: this.listSort(res.data.data),
                });
            })
            .catch(res => console.log(res))
    }

    listSort = (data) => {
        return (data.sort((a, b) => {
            //status 내림차순으로 정렬
            return b.usingStatus - a.usingStatus;
        }))
    }

    render() {
        return (
            <div>
                <div>
                {this.state.list.map((item, idx) =>
                    <GymUseInfoContents
                        item={item}
                        key={idx}
                        searchOnClick={this.searchOnClick}
                        isAuthentication={this.props.isAuthentication}
                    />
                )}
                </div>
            </div>
        );
    }
}
export default GymUseInfoComponent;