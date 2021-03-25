import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persisConfig = {
    key: "root",
    storage
};

const store = (reducers) => {
    const enhancedReducer = persistReducer(persisConfig, reducers);
    return createStore(enhancedReducer, applyMiddleware(logger));
}
export default store;