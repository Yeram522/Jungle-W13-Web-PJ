package jungle.board.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class PostDtos {

    @Getter @Setter
    public static class PostRequest {
        @JsonProperty("post_title")
        private String postTitle;

        @JsonProperty("post_content")
        private String postContent;
    }

    @Getter @Setter
    public static class PostResponse {
        private Long id;
        private String postTitle;
        private String postContent;
        private String postDate;
    }
}