package my.app.server.common.repository;

import my.app.server.common.entity.Content;

import java.time.LocalDateTime;
import java.util.List;

public interface ContentRepositoryCustom {
    List<Content> stringSearch(String searchString);
    List<Content> stringSearchOneDay(LocalDateTime start, LocalDateTime end,String searchString);
}
