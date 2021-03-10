package my.app.server.common.repository;

import my.app.server.common.entity.GymMembership;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymMembershipRepository extends JpaRepository<GymMembership,Long> {
}
