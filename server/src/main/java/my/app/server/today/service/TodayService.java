package my.app.server.today.service;

import lombok.RequiredArgsConstructor;
import my.app.server.entity.Content;
import my.app.server.repository.ContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TodayService {
    private final ContentRepository contentRepository;

    @Transactional(readOnly = true)
    public List<Content> findContentsNormal() {
        return contentRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Content> findContentsOrderByRegDate() { return contentRepository.findAllByOrderByRegisterDateDesc(); }

    public Long createContent(Content content) {
        contentRepository.save(content);
        return content.getId();
    }

    public void plusLike(Long id) {
        Content content = contentRepository.findById(id).get();
        content.setLikes(content.getLikes() + 1);
    }

    public void minusLike(Long id) {
        Content content = contentRepository.findById(id).get();
        if(content.getLikes() == 0)
            return;
        content.setLikes(content.getLikes() - 1);
    }

    public void plusDislike(Long id) {
        Content content = contentRepository.findById(id).get();
        content.setDislikes(content.getDislikes() + 1);
    }

    public void minusDislike(Long id) {
        Content content = contentRepository.findById(id).get();
        if(content.getDislikes() == 0)
            return;
        content.setDislikes(content.getDislikes() - 1);
    }

    public void plusReport(Long id) {
        Content content = contentRepository.findById(id).get();
        content.setReports(content.getReports() + 1);
    }

    public void minusReport(Long id) {
        Content content = contentRepository.findById(id).get();
        if(content.getReports() == 0)
            return;
        content.setReports(content.getReports() - 1);
    }
}
