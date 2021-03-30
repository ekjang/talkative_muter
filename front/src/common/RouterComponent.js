import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";
import Summary from "../home/Summary";
import LogoutComponent from "../login/Logout";
import MailAuth from "../auth/MailAuth";
import PopularMain from "../popular/PopularMain";
import TodayMain from "../today/TodayMain";
import GymInfoMain from "../gym/GymInfoMain";
import LoginComponent from "../login/Login";
import RandomGame from "../enjoy/random/RandomGame";
import LunchMain from "../enjoy/lunch/LunchMain";

/**
 * 라우터 정의
 */
class RouterComponent extends Component {

    render() {
        return (
            <div>
                <Switch>
                    {/*홈 화면*/}
                    <Route exact path="/"
                           render={() => <Summary
                               today={this.props.today}
                               nickName={this.props.nickName}
                               loginCheck={this.props.loginCheck}
                           />
                           }
                    />
                    {/*로그인*/}
                    <Route exact path="/login"
                           render={() => <LoginComponent
                               loginCheck={this.props.loginCheck}
                           />
                           }
                    />
                    {/*로그아웃*/}
                    <Route exact path="/logout"
                           render={() => <LogoutComponent
                               loginCheck={this.props.loginCheck}
                           />
                           }
                    />
                    {/*메일 인증코드 발송 화면*/}
                    <Route exact path="/mailAuth"
                           render={() => <MailAuth
                               loginCheck={this.props.loginCheck}
                           />
                           }
                    />
                    {/*오늘 벙어리 화면*/}
                    <Route exact path="/today"
                           render={() => <TodayMain
                               today={this.props.today}
                           />
                           }
                    />
                    {/*인기 벙어리 화면*/}
                    <Route exact path="/popular"
                           render={() => <PopularMain
                               today={this.props.today}
                           />
                           }
                    />
                    {/*헬스장 이용정보 화면*/}
                    <Route exact path="/gymInfo"
                           render={() => <GymInfoMain
                               today={this.props.today}
                           />
                           }
                    />
                    {/*오늘 뭐 먹지?*/}
                    <Route exact path="/lunch"
                           render={() => <LunchMain
                           />
                           }
                    />
                    {/*돌려돌려 화면*/}
                    <Route exact path="/randomGame"
                           render={() => <RandomGame
                           />
                           }
                    />
                </Switch>
            </div>
        );
    }
}
export default RouterComponent;