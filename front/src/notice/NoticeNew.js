export const NoticeNew = () => {
    window.Kakao.API.request({
        url: '/v2/api/talk/memo/default/send',
        data: {
            template_object: {
                "object_type": "text",
                "text": "새 글 등록! 얼른 확인하러 가요~",
                "link": {
                    "web_url": "http://3.135.46.91:3000",
                    "mobile_web_url": "http://3.135.46.91:3000"
                },
                "button_title": "바로 확인"
            }
        },
    });
}