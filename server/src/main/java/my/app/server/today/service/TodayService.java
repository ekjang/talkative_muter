package my.app.server.today.service;

import lombok.RequiredArgsConstructor;
import my.app.server.entity.Content;
import my.app.server.repository.ContentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TodayService {
    private final ContentRepository contentRepository;

    public List<Content> findContents() {
        return contentRepository.findAll();
    }
}
