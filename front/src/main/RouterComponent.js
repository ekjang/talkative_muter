import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import SummaryComponent from "./SummaryComponent";
import LoginComponent from "../user/LoginComponent";
import LogoutComponent from "../user/LogoutComponent";
import CompanyAuthComponent from "../user/CompanyAuthComponent";
import PopularComponent from "../popular/PopularComponent";
import TodayComponent from "../today/TodayComponent";
import JoinComponent from "../user/JoinComponent";

/**
 * 라우터 정의
 */
class RouterComponent extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/"
                           render={() => <SummaryComponent
                               isMember={this.props.isMember}
                           />
                           }
                    />
                    <Route exact path="/login"
                           render={() => <LoginComponent
                               isMember={this.props.isMember}
                               authCheck={this.props.authCheck}
                           />
                           }
                    />
                    <Route exact path="/logout"
                           render={() => <LogoutComponent
                               isMember={this.props.isMember}
                               authCheck={this.props.authCheck}
                           />
                           }
                    />
                    <Route exact path="/companyAuth"
                           render={() => <CompanyAuthComponent
                               isMember={this.props.isMember}
                           />
                           }
                    />
                    <Route exact path="/join"
                           render={() => <JoinComponent
                               isMember={this.props.isMember}
                           />
                           }
                    />
                    <Route exact path="/popular"
                           render={() => <PopularComponent
                               isMember={this.props.isMember}
                           />
                           }
                    />
                    <Route exact path="/today"
                           render={() => <TodayComponent
                               isMember={this.props.isMember}
                           />
                           }
                    />
                </Switch>
            </div>
        );
    }
}
export default RouterComponent;