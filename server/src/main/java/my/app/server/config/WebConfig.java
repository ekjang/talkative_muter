package my.app.server.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Created by ekjan.
 * Date : 2021-03-24 오전 10:14
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    /**
     * CORS(Cross-origin resource sharing) 이슈에 대한 설정
     *  - 각 controller에 존재하는 @CrossOrigin 어노테이션 생략 가능
     * @param corsRegistry
     */
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://192.168.0.20:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
        ;
    }
}
