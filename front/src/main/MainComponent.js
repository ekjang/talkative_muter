import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MenuComponent from "../menu/MenuComponent";
import PopularComponent from "../popular/PopularComponent";
import TodayComponent from "../today/TodayComponent";
import SummaryComponent from "./SummaryComponent";
import "./MainStyle.css"
import LoginComponent from "../user/LoginComponent";
import LogoutComponent from "../user/LogoutComponent";
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
                    <Switch>
                        <Route exact path="/login"
                               render={() => <LoginComponent
                                   isMember={this.state.isMember}
                               />
                               }
                        />
                        <Route exact path="/logout"
                               render={() => <LogoutComponent
                                   isMember={this.state.isMember}
                               />
                               }
                        />
                        <Route exact path="/"
                               render={() => <SummaryComponent
                                   isMember={this.state.isMember}
                               />
                               }
                        />
                        <Route exact path="/popular"
                               render={() => <PopularComponent
                                   isMember={this.state.isMember}
                               />
                               }
                        />
                        <Route exact path="/today"
                               render={() => <TodayComponent
                                   isMember={this.state.isMember}
                               />
                               }
                        />
                    </Switch>
                </div>
                </Router>
            </div>
        );
    }
}
export default MainComponent;