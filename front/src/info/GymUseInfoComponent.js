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
                console.log(res.data.data)
                this.setState({
                    list: res.data.data,
                });
            })
            .catch(res => console.log(res))
        this.listSort()
    }

    listSort = () => {
        this.setState({list: this.state.list.sort((a, b) => {
                //id 내림차순으로 정렬
                // return b.id - a.id;
                //id 오름차순으로 정렬
                return a.id - b.id;
            })
        })
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