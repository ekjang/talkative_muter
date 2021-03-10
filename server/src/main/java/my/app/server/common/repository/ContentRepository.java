package my.app.server.common.repository;

import my.app.server.common.entity.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ContentRepository extends JpaRepository<Content,Long> {

    List<Content> findAllByOrderByRegisterDateDesc();
    List<Content> findTop5ByOrderByRegisterDateDesc();


    List<Content> findAllByRegisterDateBetweenOrderByRegisterDateDesc(LocalDateTime start, LocalDateTime end);

    Page<Content> findAll(Pageable pageable);
}
