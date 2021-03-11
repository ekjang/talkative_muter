import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class LogoutComponent extends Component {

    componentDidMount() {
        this.logoutHandler()
    }

    logoutHandler = () => {
        this.props.companyAuthCheck(false)
        localStorage.clear()
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