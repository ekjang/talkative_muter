package my.app.server.auth.controller.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by ekjan.
 * Date : 2021-03-10 오후 7:14
 */
@Getter
@Setter
@Component
public class Sender {
    @Value("${mail.domain}")
    String domain;
    @Value("${mail.host}")
    String Host;
    @Value("${mail.port}")
    int port;
    @Value("${mail.username}")
    String username;
    @Value("${mail.password}")
    String password;

    @Value("${mail.transport.protocol}")
    String protocol;
    @Value("${mail.smtp.auth}")
    String auth;
    @Value("${mail.smtp.starttls.enable}")
    String starttlsEnable;
    @Value("${mail.smtp.ssl.enable}")
    String sslEnable;
    @Value("${mail.debug}")
    String debug;
}
