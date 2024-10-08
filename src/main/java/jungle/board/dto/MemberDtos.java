package jungle.board.dto;

import lombok.Getter;
import lombok.Setter;

public class MemberDtos {

    @Getter @Setter
    public static class MemberSignupDto {
        private String email;
        private String username;
        private String password;
    }

    @Getter @Setter
    public static class MemberLoginDto {
        private String email;
        private String password;
    }
}
