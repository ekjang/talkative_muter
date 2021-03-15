package my.app.server.popular.service;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.Content;
import my.app.server.common.repository.ContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PopularService {

    private final ContentRepository contentRepository;

    @Transactional(readOnly = true)
    public List<Content> findTop5LastWeekPopular(){
        LocalDateTime startDatetime = LocalDateTime.of(LocalDate.now().minusDays(7L), LocalTime.of(0,0,0)); //어제 00:00:00
        LocalDateTime endDatetime = LocalDateTime.of(LocalDate.now(), LocalTime.of(23,59,59)); //오늘 23:59:59
        return contentRepository.findTop5ByRegisterDateBetweenOrderByLikesDesc(startDatetime,endDatetime);

    }
}
