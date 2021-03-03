import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import MenuComponent from "../menu/MenuComponent";
import RouterComponent from "./RouterComponent";
import "./MainStyle.css"


class MainComponent extends Component {
    state = {
        isMember: false,
        token: ''
    }
    render() {
        return (
            <div className="site-style">
                <Router>
                <div>
                    <MenuComponent
                        title="말 많은 벙어리"
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