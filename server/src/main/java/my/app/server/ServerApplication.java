package my.app.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication {

    static {
        System.setProperty("spring.config.location", "classpath:/application.yml,classpath:/mail.yml");
    }
    public static void main(String[] args) {
        SpringApplication.run(ServerApplication.class, args);
    }
}
