package my.app.server.auth.controller.model;

/**
 * Created by ekjan.
 * Date : 2021-03-12 오후 2:47
 */
public class ApiModel {
    //kakao infomation
    public String id = "";
    public String ageRange = "";
    public String gender = "";
    public String accessToken = "";
    public String refreshToken = "";

    //회사 메일 인증 여부
    public boolean isCompanyAuth = false;

    //회사 메일인증 코드 갱신일 (유효기간 한달.?)
    public String authCheckDate = "";
}
