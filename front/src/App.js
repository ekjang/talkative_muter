import './App.css';
import HomeComponent from "./home/HomeComponent";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./store/store"
import reducers from "./reducers";
/*
import firebase from 'firebase';

const config =  {
    apiKey: "AIzaSyCskAoyJOhiuK0N384sBFW-Ji82g40_66g",
    authDomain: "you-are-muter.firebaseapp.com",
    projectId: "you-are-muter",
    storageBucket: "you-are-muter.appspot.com",
    messagingSenderId: "897893089831",
    appId: "1:897893089831:web:eed74541fae8298f78c402",
    measurementId: "G-259B1FN335"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.requestPermission()
    .then(function() {
        console.log('허가!');
        return messaging.getToken(); //토큰을 받는 함수를 추가!
    })
    .then(function(token) {
        console.log(token); //토큰을 출력!
        localStorage.setItem('token', token)
    })
    .catch(function(err) {
        console.log('fcm에러 : ', err);
    })

messaging.onMessage(function(payload){
    console.log(payload.notification.title);
    console.log(payload.notification.body);
})

messaging.onTokenRefresh(function() {
    messaging.getToken()
        .then(function(refreshedToken) {
            console.log(refreshedToken);
            console.log('Token refreshed.');
        })
        .catch(function(err) {
            console.log('Unable to retrieve refreshed token ', err);
        });
});
*/

const store = createStore(reducers);
const persistor = persistStore(store)

function App() {
    console.log(store)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <div className="App">
                <HomeComponent />
            </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
