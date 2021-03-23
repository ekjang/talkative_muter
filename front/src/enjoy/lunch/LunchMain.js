import React, { Component } from "react";
import axios from "axios";
import server_url from "../../define/Url";
import LunchItem from "./LunchItem";
class LunchMain extends Component {

    state = {
        list: [],
        recommend: '',
    }

    searchGoogle = () => {
        axios.get(server_url + "/lunch/list")
            .then(res => {
                console.log(res.data.list)
                this.setState({list: res.data.list});
            })
            .catch(err => console.log(err));
    }

    recommend = () => {
        const { list } = this.state
        if(list.length > 0) {
            let winning = Math.floor(Math.random() * list.length)
            this.setState({recommend: list[winning].restaurant})
        } else {
            this.refSearch.focus();
            alert("'검색해' 를 눌러주세요.");
        }
    }


    render() {
        return (
            <div>
                <div>
                    <button onClick={this.searchGoogle}
                            ref={(ref) => {this.refSearch = ref;}}
                    >검색해</button>
                </div>
                <div>
                    <button onClick={this.recommend}>뽑아줘</button>
                </div>
                {this.state.recommend !== '' &&
                <div>
                    <span>
                        오늘은 [[[ {this.state.recommend} ]]] (으)로 가자!!
                    </span>
                </div>
                }
                <div>
                    {this.state.list.map((item, idx) =>
                    <LunchItem
                        item={item}
                        key={idx}
                    />
                    )}
                </div>
            </div>
        );
    }
}
export default LunchMain;