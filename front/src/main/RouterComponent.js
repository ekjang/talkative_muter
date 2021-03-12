import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import SummaryComponent from "./SummaryComponent";
import LogoutComponent from "../login/LogoutComponent";
import CompanyAuthComponent from "../auth/CompanyAuthComponent";
import PopularComponent from "../popular/PopularComponent";
import TodayComponent from "../today/TodayComponent";
import JoinComponent from "../login/JoinComponent";
import GymUseInfoComponent from "../info/GymUseInfoComponent";
import LoginComponent from "../login/LoginComponent";

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
                               today={this.props.today}
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/login"
                           render={() => <LoginComponent
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/logout"
                           render={() => <LogoutComponent
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/companyAuth"
                           render={() => <CompanyAuthComponent
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/authentication"
                           render={() => <CompanyAuthComponent
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/join"
                           render={() => <JoinComponent
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/popular"
                           render={() => <PopularComponent
                               today={this.props.today}
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/today"
                           render={() => <TodayComponent
                               today={this.props.today}
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/gymInfo"
                           render={() => <GymUseInfoComponent
                               today={this.props.today}
                               isAuthentication={this.props.isAuthentication}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                </Switch>
            </div>
        );
    }
}
export default RouterComponent;