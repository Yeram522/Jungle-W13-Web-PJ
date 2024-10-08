package jungle.board.application;

import jungle.board.domain.Member;
import jungle.board.dto.MemberDtos;
import jungle.board.infrastructure.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public boolean signup(MemberDtos.MemberSignupDto signupDto) {
        if (memberRepository.existsByEmail(signupDto.getEmail()) ||
                memberRepository.existsByUsername(signupDto.getUsername())) {
            return false;
        }

        Member member = Member.builder()
                .email(signupDto.getEmail())
                .username(signupDto.getUsername())
                .password(signupDto.getPassword())
                .build();

        memberRepository.save(member);
        return true;
    }

    public boolean login(MemberDtos.MemberLoginDto loginDto) {
        return memberRepository.findByEmail(loginDto.getEmail())
                .map(member -> member.getPassword().equals(loginDto.getPassword()))
                .orElse(false);
    }

    public boolean isEmailDuplicate(String email) {
        return memberRepository.existsByEmail(email);
    }

    public boolean isUsernameDuplicate(String username) {
        return memberRepository.existsByUsername(username);
    }
}
