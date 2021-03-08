package my.app.server.repository;

import my.app.server.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content,Long> {

    List<Content> findAllByOrderByRegisterDateDesc();
    List<Content> findTop5ByOrderByRegisterDateDesc();
}
