package my.app.server.auth.controller;

import lombok.RequiredArgsConstructor;
import my.app.server.auth.model.ApiModel;
import org.springframework.web.bind.annotation.*;

/**
 * 이건 테스트 클래스임. 추후 삭제 예정
 * Created by ekjan.
 * Date : 2021-03-12 오전 11:19
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/oauth")
public class ApiController {
    //////////////////////////////////////////////////
    //Kakao API test

    @PostMapping("/login")
    public boolean postLoginApi(@RequestBody ApiModel apiModel) {
        System.out.println("apiModel:" + apiModel);
        System.out.println("request :: " + apiModel.id+","+apiModel.ageRange+","+apiModel.gender+","+apiModel.accessToken+","+apiModel.refreshToken);
        return true;
    }
}
