package my.app.server.repository;

import my.app.server.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content,Long> {
}
