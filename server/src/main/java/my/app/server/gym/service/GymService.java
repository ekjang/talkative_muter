package my.app.server.gym.service;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import my.app.server.common.repository.GymMembershipRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    public void enterGym(Long id) {
        GymMembership findMembership = gymMembershipRepository.findById(id).get();
        findMembership.enterGym(LocalDateTime.of(LocalDate.now(), LocalTime.now()));
    }

    public void exitGym(Long id) {
        GymMembership findMembership = gymMembershipRepository.findById(id).get();
        findMembership.exitGym();
    }

}
