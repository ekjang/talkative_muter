import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuComponent";
import RouterComponent from "./RouterComponent";
import "./MainStyle.css"


class MainComponent extends Component {
    state = {
        isMember: true, //로그인 여부
        token: ''
    }
    render() {
        return (
            <div className="site-style">
                <Router>
                <div>
                    <MenuComponent
                        title="말.많.벙"
                        isMember={this.state.isMember}
                    />
                </div>

                <div className="content-style">
                    <RouterComponent
                        isMember={this.state.isMember}
                    />
                </div>
                </Router>
            </div>
        );
    }
}
export default MainComponent;