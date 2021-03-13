export const NoticeGym = () => {
    window.Kakao.API.request({
        url: '/v2/api/talk/memo/default/send',
        data: {
            template_object: {
                "object_type": "text",
                "text": "헬스장 이용 정보가 변경되었습니다.",
                "link": {
                    "web_url": "http://3.135.46.91:3000/gymInfo",
                    "mobile_web_url": "http://3.135.46.91:3000/gymInfo"
                },
                "button_title": "바로 확인"
            }
        },
    });
}