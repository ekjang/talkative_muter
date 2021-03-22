package my.app.server.gym.service;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import my.app.server.common.repository.GymMembershipRepository;
import my.app.server.exception.service.CustomException;
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
        return gymMembershipRepository.findAllByOrderByIdAsc();
    }

    public void enterGym(Long id, Long memberId) {
        long count = gymMembershipRepository.countByMemberId(memberId);
        if(count > 0) {
            throw new CustomException("이미 이용중인 번호가 있습니다.", 1111);
        } else {
            GymMembership findMembership = gymMembershipRepository.findById(id).get();
            findMembership.enterGym(LocalDateTime.of(LocalDate.now(), LocalTime.now()), memberId);
        }
    }

    public void exitGym(Long id, Long memberId) {
        GymMembership findMembership = gymMembershipRepository.findById(id).get();
        if(findMembership.getMemberId().equals(memberId)) {
            findMembership.exitGym();
        } else {
            throw new CustomException("다른 사람이 사용중인 정보를 변경할 수 없습니다.", 1112);
        }
    }

}
