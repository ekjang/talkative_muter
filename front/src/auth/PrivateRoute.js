// import {Route, Redirect} from "react-router-dom";
//
// const PrivateRoute = ({component: Component, ...rest}) => {
//     let isMember = localStorage.getItem('isMember')
//     let isAuthentication = localStorage.getItem('isAuthentication')
//
//     return (
//         <Route
//             {...rest}
//             render={(props) => (isMember || isAuthentication ? <Component {...props} /> : <Redirect to="/login" />)}
//             />
//     )
// }
// export default PrivateRoute;