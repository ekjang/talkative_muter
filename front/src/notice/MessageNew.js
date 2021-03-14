import axios from "axios";

export const MessageNew = () => {

    const serverKey = "AAAA0Q6ZQic:APA91bESpxUpkxDrzhDI4gOP5mx1Ej0nk1jGkYwZHSEA1AphNiqeBRh0xw-Kgb_fHU6HqmKndnyQAiigmjvUzDmK-ZmRrJaCuCiF3FD2BJlnOmph5p_RbSrqC-YucJupx6QAfOFflE4w"

    const option = {
        method: 'POST',
        url: 'https://fcm.googleapis.com/fcm/send', //FCM서버의 주소입니다. 그대로 쓰시면 됩니다.
        json: {
            'to' : 'fwP3zawPLsghHHktvxrSxf:APA91bFATRYpGIDcRzYHOg7CNK2XR0Mj0bKusVMVRoF01Mza2nG1fHwpawmjEYNVlcqxR78AyuOPiMsgtJbAqj2W0oekjufaMPLjS_suHEf6NOhqmVQoR_OkBaIT9uj49ET6yE94giHz', //2-2에서 복사해놓은 토큰을 사용합니다.
            'notification': { //꼭 notification일 필요는 없습니다. data든 뭐든 바꿔도 됩니다.
                'title': '말.많.벙', //알림의 제목에 해당하는 부분입니다.
                'body': 'test!', //알림의 본문에 해당하는 부분입니다.
            }
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=' + serverKey //위에서 찾았던 서버키 앞에 'key='을 붙여서 사용합니다.
        }
    }

    axios(option).then(res => {
      console.log(res)
    });
}