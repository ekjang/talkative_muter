package my.app.server.today.service;

import my.app.server.common.entity.Content;
import my.app.server.common.repository.ContentRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

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
    @Test
    @Disabled("insert 후 db 에 있는 값을 다시 entity로 불러오는 법을 알아야함 ")
    public void plusLikeTest() {
        Content contentGlobal = new Content("create plus like test!!");

        Long contentId = createContent(contentGlobal);
        Content content = findById(contentId);

        Long beforeLikes = content.getLikes();
        System.out.println("beforeLikes = " + beforeLikes);
        todayService.plusLike(contentId);

        System.out.println("findContent.getLikes = " + contentGlobal.getLikes());

        //assertThat(content.getLikes()).isEqualTo(beforeLikes + 1);


    }

    @Test
    public void before10minsTest() {
        List<Content> result = todayService.find10MinsContents();
        for (Content content : result) {
            System.out.println("content.getRegisterDate() = " + content.getRegisterDate());
        }
    }
}