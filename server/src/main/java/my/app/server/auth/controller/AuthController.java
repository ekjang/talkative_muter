package my.app.server.auth.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.auth.model.Sender;
import my.app.server.auth.service.AuthMemberService;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.InternetAddress;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthMemberService memberService;
    private final Sender sender;

    @PostMapping("/checkMail")
    public Map<String, Object> SendMail(@RequestBody @Valid MailAuthRequest mail) {
        Map<String, Object> map = new HashMap<>();
        Random random = new Random();  //난수 생성을 위한 랜덤 클래스
        String key = "";  //인증번호

        //from mail info 설정
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost(sender.getHost());
        javaMailSender.setPort(sender.getPort());
        javaMailSender.setUsername(sender.getUsername());
        javaMailSender.setPassword(sender.getPassword());

        //from mail env 설정
        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", sender.getProtocol());
        props.put("mail.smtp.auth", sender.getAuth());
        props.put("mail.smtp.starttls.enable", sender.getStarttlsEnable());
        props.put("mail.debug", sender.getDebug());
        props.put("mail.smtp.ssl.enable", sender.getSslEnable());

        //입력 키를 위한 코드
        for(int i =0; i<3;i++) {
            int index=random.nextInt(25)+65; //A~Z까지 랜덤 알파벳 생성
            key+=(char)index;
        }
        int numIndex = random.nextInt(9999)+1000; //4자리 랜덤 정수를 생성
        key += numIndex;

        //mail send message setting
        String finalKey = key;
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            messageHelper.setFrom(sender.getUsername() + "@" + sender.getDomain());
            messageHelper.setTo(InternetAddress.parse(mail.getMail()));
            messageHelper.setSubject("말.많.벙 인증번호입니다.");
            messageHelper.setText("인증 번호 : " + finalKey, true);
        };

        //mail send
        javaMailSender.send(messagePreparator);
        map.put("key", key);
        return map;
    }

    @PostMapping("/login")
    public boolean sendKakaoAuth(@RequestBody KakaoAuthRequest request) {
        if(memberService.checkNewMember(request.getId())){
            Long createdId = memberService.createNewMember(request.getId(), request.getAgeRange(), request.getGender());
            return false;
        }
        else if (memberService.isAuthMember(request.getId()))
            return true;
        else
            return false;
    }

    @PostMapping("/access")
    public boolean updateKakaoAuth(@RequestBody KakaoAuthUpdateRequest request) {
        if (memberService.isAuthMember(request.getId())){
            return true;
        }
        else {
            memberService.updateAuthStatus(request.getId());
            return true;
        }
    }

    @Data
    static class KakaoAuthUpdateRequest {
        private Long id;
    }

    @Data
    static class KakaoAuthRequest {
        private Long id;
        private String ageRange;
        private String gender;
    }

    @Data
    static class MailAuthRequest {
        private String mail;
    }
}
