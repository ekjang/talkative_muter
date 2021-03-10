import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import SummaryComponent from "./SummaryComponent";
import LoginComponent from "../user/LoginComponent";
import LogoutComponent from "../user/LogoutComponent";
import CompanyAuthComponent from "../user/CompanyAuthComponent";
import PopularComponent from "../popular/PopularComponent";
import TodayComponent from "../today/TodayComponent";
import JoinComponent from "../user/JoinComponent";
import GymUseInfoComponent from "../info/GymUseInfoComponent";

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
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/login"
                           render={() => <LoginComponent
                               isMember={this.props.isMember}
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/logout"
                           render={() => <LogoutComponent
                               isMember={this.props.isMember}
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/companyAuth"
                           render={() => <CompanyAuthComponent
                               isMember={this.props.isMember}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/authentication"
                           render={() => <CompanyAuthComponent
                               isMember={this.props.isMember}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/join"
                           render={() => <JoinComponent
                               isMember={this.props.isMember}
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/popular"
                           render={() => <PopularComponent
                               isMember={this.props.isMember}
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/today"
                           render={() => <TodayComponent
                               isMember={this.props.isMember}
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
                               companyAuthCheck={this.props.companyAuthCheck}
                           />
                           }
                    />
                    <Route exact path="/gymInfo"
                           render={() => <GymUseInfoComponent
                               isMember={this.props.isMember}
                               // token={this.props.token}
                               isAuthentication={this.props.isAuthentication}
                               isMemberCheck={this.props.isMemberCheck}
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