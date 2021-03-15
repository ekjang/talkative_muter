package my.app.server.today.service;

import my.app.server.common.entity.Content;
import my.app.server.common.repository.ContentRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = false)
class TodayServiceTest {

    @Autowired
    TodayService todayService;
    @Autowired
    ContentRepository contentRepository;
    @PersistenceContext
    EntityManager em;

    @Test
    public void createContentTest() {
        Content content = new Content("create content test!!");
        Long contentId = todayService.createContent(content);
        assertThat(content.getContent()).isEqualTo(contentRepository.findById(contentId).get().getContent());
    }

    @Transactional
    public Long createContent(Content content) {
        contentRepository.saveAndFlush(content);
        return content.getId();
    }
    @Transactional(readOnly = true)
    public Content findById(Long id){
        return contentRepository.findById(id).get();
    }

    static {
        System.setProperty("spring.config.location", "classpath:/application.yml,classpath:/mail.yml");
    }
    @Test
    public void plusLikeTest() {
        Content testContent = new Content("create plus like test!!");

        Long contentId = createContent(testContent);// id 조회용

        em.flush();
        em.clear();//영속성 컨텍스트 초기화
        Content content = findById(contentId);
        Long beforeLikes = content.getLikes();

        System.out.println("beforeLikes = " + beforeLikes);
        todayService.plusLike(contentId);
        em.flush();
        em.clear();

        Content contentAfter = findById(contentId);
        System.out.println("findContent.getLikes = " + contentAfter.getLikes());

        assertThat(content.getLikes()).isEqualTo(beforeLikes + 1);
    }

    @Test
    public void before10minsTest() {
        List<Content> result = todayService.find10MinsContents();
        for (Content content : result) {
            System.out.println("content.getRegisterDate() = " + content.getRegisterDate());
        }
    }
}