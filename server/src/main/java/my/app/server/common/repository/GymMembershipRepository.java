package my.app.server.common.repository;

import my.app.server.common.entity.GymMembership;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GymMembershipRepository extends JpaRepository<GymMembership,Long> {
    List<GymMembership> findAllByOrderByIdAsc();
    long countByMemberId(Long memberId);
}
