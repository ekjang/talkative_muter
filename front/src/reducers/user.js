/**
 * 사용자 로그인, 로그아웃 정보 리듀서
 */

import * as type from "./type";

export const loginAction = (id, token, isAuth) => ({
    type: type.LOGIN,
    id, //: id,
    token, //: token,
    isAuth //: isAuth
});

export const logoutAction = () => ({
    type: type.LOGOUT,
    // id, //: '',
    // token, //: '',
    // isAuth, //: false,
    // nickName//: ''
});

const initialState = {
    id: '',
    token: '',
    isAuth: false,
    nickName: '',
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case(type.LOGIN):
            return {
                ...state,
                id: action.id,
                token: action.token,
                isAuth: action.isAuth
            }
        case(type.LOGOUT):
            return {
                ...state,
                id: '',
                token: '',
                isAuth: false,
                nickName: '',
            }
        case(type.SET_NICKNAME):
            return {
                ...state,
                nickName: action.nickName
            }
        // default 안 쓰면 처음 state에 선언된 값이 undefined가 나옴. 꼭 써야함.
        default:
            return state
    }
}
export default user;