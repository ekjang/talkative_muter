import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class LogoutComponent extends Component {

    componentDidMount() {
        this.logoutHandler()
    }

    logoutHandler = () => {
        this.props.companyAuthCheck(false)
        localStorage.clear()
        //닉네임 삭제 서버 요청
        //axios.delete
        this.props.history.push("/")
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}
export default withRouter(LogoutComponent);