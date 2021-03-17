package my.app.server.today.service;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.Content;
import my.app.server.common.repository.ContentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

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

    @Transactional(readOnly = true)
    public List<Content> findContentsTop5OrderByRegDate() { return contentRepository.findTop5ByOrderByRegisterDateDesc(); }

    @Transactional(readOnly = true)
    public Page<Content> findAll(Pageable pageable) {
        return contentRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public List<Content> findOneDayContents(String today) {
        LocalDate todayDate = LocalDate.parse(today, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDateTime startDatetime = LocalDateTime.of(todayDate.minusDays(1L), LocalTime.of(0,0,0)); //어제 00:00:00
        LocalDateTime endDatetime = LocalDateTime.of(todayDate, LocalTime.of(23,59,59)); //오늘 23:59:59
        return contentRepository.findAllByRegisterDateBetweenOrderByRegisterDateDesc(startDatetime,endDatetime);
    }

    @Transactional(readOnly = true)
    public List<Content> findOneWeekContents(String today) {
        LocalDate todayDate = LocalDate.parse(today, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDateTime startDatetime = LocalDateTime.of(todayDate.minusDays(7L), LocalTime.of(0,0,0)); //어제 00:00:00
        LocalDateTime endDatetime = LocalDateTime.of(todayDate, LocalTime.of(23,59,59)); //오늘 23:59:59
        return contentRepository.findAllByRegisterDateBetweenOrderByRegisterDateDesc(startDatetime,endDatetime);
    }

    @Transactional(readOnly = true)
    public List<Content> find10MinsContents() {
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.now().minusMinutes(10L)); //10분 전
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.now()); //오늘 23:59:59
        return contentRepository.findAllByRegisterDateBetweenOrderByRegisterDateDesc(startDatetime,endDatetime);
    }

    public Long createContent(Content content) {
        contentRepository.save(content);
        return content.getId();
    }

    public void deleteContent(Long id) {
        Optional<Content> byId = contentRepository.findById(id);

        Content content = byId.orElse(null); //이렇게 처리하는게 맞나?
        contentRepository.delete(content);
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
