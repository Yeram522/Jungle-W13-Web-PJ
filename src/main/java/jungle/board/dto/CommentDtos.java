package jungle.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class CommentDtos {

    @Getter @Setter
    public static class CommentRequest {
        private Long postId;
        private String commentContent;
    }

    @Getter @Setter
    public static class CommentResponse {
        private String commentContent;
        private String commentDate;
    }
}
