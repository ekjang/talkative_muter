package my.app.server.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by ekjan.
 * Date : 2021-03-24 오전 8:48
 */
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 웹 보안 설정
     * @param http
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                //url 접근 제한 설정
                .antMatchers("/", "/css/**", "/images/**", "/js/**", "/*.ico").permitAll()
                .antMatchers("/login", "/auth/login").permitAll()
                .antMatchers("/today/newCount", "/today/todayCount", "/today/contentsLimit", "/popular/contentsLimit").permitAll()
                //authentication 처리 완료되면 아래 주석 해제
//                .anyRequest().authenticated()
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
        //아래는 oauth2 로그인 시 유저서비스 설정
//                .oauth2Login()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService)
                ;
    }
}
