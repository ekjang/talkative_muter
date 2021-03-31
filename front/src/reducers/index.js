import { combineReducers } from "redux";
import user from "./user";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드
// sotre에 저장되는 reducer는 1개임
const rootReducer = combineReducers({
    user,
});
export default rootReducer;