package my.app.server.common.repository;

import my.app.server.common.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query(value = "select m from Member m where m.id = :id")
    Member findMember(@Param("id") Long id);
}
