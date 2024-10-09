package jungle.board.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class MemberLoginDto {
        @JsonProperty("email")
        private String email;
        private String password;
    }
}
