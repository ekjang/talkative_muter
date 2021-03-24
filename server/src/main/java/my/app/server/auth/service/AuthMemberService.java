package my.app.server.auth.service;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.Member;
import my.app.server.common.entity.enums.AuthStatus;
import my.app.server.common.entity.enums.Gender;
import my.app.server.common.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthMemberService {
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public boolean checkNewMember(Long id) {
        Optional<Member> result = memberRepository.findById(id);
        if(result.isPresent()){
            return false;
        }
        else
            return true;

    }

    @Transactional(readOnly = true)
    public boolean isAuthMember(Long id) {
        Member member = memberRepository.findById(id).get();
        switch (member.getIsAuth()) {
            case AUTH_OK:
                return true;
            default:
                return false;
        }
    }

    public Long createNewMember(Long id, String ageRange, String gender) {
        Member save = memberRepository.save(new Member(id, ageRange, Gender.valueOf(gender)));
        return save.getId();
    }

    public void updateAuthStatus(Long id) {
        Member member = memberRepository.findMember(id);
        member.setIsAuth(AuthStatus.AUTH_OK);
    }

}
