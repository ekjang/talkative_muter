import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MenuComponent from "../menu/MenuComponent";
import PopularComponent from "../popular/PopularComponent";
import TodayComponent from "../today/TodayComponent";
import SummaryComponent from "./SummaryComponent";
import "./MainStyle.css"
class MainComponent extends Component {
    render() {
        return (
            <div className="site">
                <Router>
                <div>
                    <MenuComponent
                        title="말 많은 벙어리"
                    />
                </div>

                <div className="content-style">
                    <Switch>
                        <Route exact path="/"
                               render={() => <SummaryComponent
                                   // menuOnClick={this.menuOnClick}
                                   // menuPath={this.state.menuPath}
                                   // param={this.state.param}
                                   // actionType={this.state.actionType}
                               />
                               }
                        />
                        <Route exact path="/popular"
                               render={() => <PopularComponent
                                   // menuOnClick={this.menuOnClick}
                                   // menuPath={this.state.menuPath}
                                   // param={this.state.param}
                                   // actionType={this.state.actionType}
                               />
                               }
                        />
                        <Route exact path="/today"
                               render={() => <TodayComponent
                                   // menuOnClick={this.menuOnClick}
                                   // menuPath={this.state.menuPath}
                                   // param={this.state.param}
                                   // actionType={this.state.actionType}
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