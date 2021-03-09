package my.app.server.repository;

import my.app.server.entity.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface ContentRepository extends JpaRepository<Content,Long> {

    List<Content> findAllByOrderByRegisterDateDesc();
    List<Content> findTop5ByOrderByRegisterDateDesc();


    List<Content> findAllByRegisterDateBetweenOrderByRegisterDateDesc(LocalDateTime start, LocalDateTime end);

    Page<Content> findAll(Pageable pageable);
}
