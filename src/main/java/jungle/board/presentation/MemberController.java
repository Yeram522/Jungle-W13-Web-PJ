package jungle.board.presentation;

import jungle.board.ApiResponse;
import jungle.board.application.MemberService;
import jungle.board.dto.MemberDtos;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ApiResponse<Object> signup(@RequestBody MemberDtos.MemberSignupDto signupDto) {
        boolean isSuccessful = memberService.signup(signupDto);
        return ApiResponse.ofSuccess(isSuccessful);
    }

    @GetMapping("/{email}/duplicate")
    public ApiResponse<Object> isEmailDuplicate(@PathVariable String email) {
        boolean isDuplicate = memberService.isEmailDuplicate(email);
        boolean isSuccessful = !isDuplicate;
        return ApiResponse.ofSuccess(isSuccessful);
    }

    @GetMapping("/{username}/username-duplicate")
    public ApiResponse<Object> isUsernameDuplicate(@PathVariable String username) {
        boolean isDuplicate = memberService.isUsernameDuplicate(username);
        boolean isSuccessful = !isDuplicate;
        return ApiResponse.ofSuccess(isSuccessful);
    }

    @PostMapping("login")
    public ApiResponse<Object> login(@RequestBody MemberDtos.MemberLoginDto loginDto) {
        System.out.println(loginDto.getEmail());
        System.out.println(loginDto.getPassword());
        boolean isSuccessful = memberService.login(loginDto);
        return ApiResponse.ofSuccess(isSuccessful);
    }
}
