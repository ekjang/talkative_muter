package my.app.server.repository;

import my.app.server.entity.Content;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ContentRepositoryTest {

    @Autowired
    ContentRepository contentRepository;

    @Test
    public void basicCRUD() {
        Content content1 = new Content("contents test1");
        Content content2 = new Content("contents test2");
        contentRepository.save(content1);
        contentRepository.save(content2);

        //단건 조회 검증
        Content findContents1 = contentRepository.findById(content1.getId()).get();
        Content findContents2 = contentRepository.findById(content2.getId()).get();
        assertEquals(content1, findContents1);
        assertEquals(content2, findContents2);


        //리스트 조회 검증
        List<Content> all = contentRepository.findAll();
        assertEquals(2,all.size());

        //카운트 검증
        long count = contentRepository.count();
        assertEquals(2, count);

        //삭제 검증
        contentRepository.delete(content1);
        contentRepository.delete(content2);

        long deletedCount = contentRepository.count();
        assertEquals(0,deletedCount);

    }
}