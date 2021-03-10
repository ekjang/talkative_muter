package my.app.server.auth.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/CheckMail")
    public Map<String, Object> SendMail(@RequestBody @Valid MailAuthRequest mail) {
        Map<String, Object> map = new HashMap<>();
        Random random = new Random();  //난수 생성을 위한 랜덤 클래스
        String key = "";  //인증번호

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getMail()); //스크립트에서 보낸 메일을 받을 사용자 이메일 주소
        //입력 키를 위한 코드
        for(int i =0; i<3;i++) {
            int index=random.nextInt(25)+65; //A~Z까지 랜덤 알파벳 생성
            key+=(char)index;
        }
        int numIndex = random.nextInt(9999)+1000; //4자리 랜덤 정수를 생성
        key += numIndex;
        message.setSubject("인증번호 입력을 위한 메일 전송");
        message.setText("인증 번호 : " + key);

        JavaMailSender javaMailSender = new JavaMailSenderImpl();
        javaMailSender.send(message);
        map.put("key", key);

        return map;
    }

    @Data
    static class MailAuthRequest {
        private String mail;
    }
}
