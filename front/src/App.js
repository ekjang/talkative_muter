import './App.css';
import HomeComponent from "./home/HomeComponent";
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

function App() {
  return (
    <div className="App">
      <HomeComponent />
      {/*<MessageNew />*/}
    </div>
  );
}

export default App;
