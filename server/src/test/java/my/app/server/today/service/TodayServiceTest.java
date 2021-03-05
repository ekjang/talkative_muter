package my.app.server.today.service;

import my.app.server.entity.Content;
import my.app.server.repository.ContentRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

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

    @Test
    public void plusLikeTest() {
/*        Content content = new Content("this is plus like test!!");
        Long contentID = todayService.createContent(content);*/
        Content content = contentRepository.findById(43L).get();

        Long beforeLikes = content.getLikes();
        System.out.println("beforeLikes = " + beforeLikes);
        todayService.plusLike(43L);

        System.out.println("findContent.getLikes = " + content.getLikes());

        //assertThat(content.getLikes()).isEqualTo(beforeLikes + 1);


    }
}