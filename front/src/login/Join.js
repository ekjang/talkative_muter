// import React, { Component } from 'react';
// import {withRouter} from "react-router-dom";
// import "./UserStyle.css"
// import KakaoLogin from "./KakaoSignUp";
//
// class Join extends Component {
//
//     componentDidMount() {
//         this.authCheck()
//     }
//
//     authCheck = () => {
//         if(!this.props.isAuth) {
//             alert("회사메일 인증이 되지 않았습니다.")
//             this.props.history.push("/mailAuth")
//         }
//     }
//
//     btnOkOnClick = () => {
//         console.log("확인 버튼")
//         //axios.post
//     }
//
//     btnNoOnClick = () => {
//         console.log("취소 버튼")
//         this.props.history.push("/")
//     }
//
//     render() {
//         return (
//             <div>
//                 <div className="user-package-title">
//                     회원가입
//                 </div>
//                 <KakaoLogin />
//             </div>
//         );
//     }
// }
// export default withRouter(Join);