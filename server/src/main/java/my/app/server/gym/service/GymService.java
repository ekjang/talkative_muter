package my.app.server.gym.service;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import my.app.server.common.repository.GymMembershipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GymService {
    private final GymMembershipRepository gymMembershipRepository;

    @Transactional(readOnly = true)
    public List<GymMembership> findAll() {
        return gymMembershipRepository.findAll();
    }
}
