package jungle.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CommentDto {

    @JsonProperty("comment_content")
    private String commentContent;

    @JsonProperty("post_id")
    private Long postId;
}
