import {Route, Redirect} from "react-router-dom";

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    let isMember = localStorage.getItem('isMember')
    let isAuthentication = localStorage.getItem('isAuthentication')
    return (
        <Route {...rest}
            render={(props) => (isMember && restricted ? <Redirect to="/" /> : <Component {...props} />)} />
    )
}
export default PublicRoute;