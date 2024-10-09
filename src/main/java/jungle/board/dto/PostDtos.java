package jungle.board.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class PostDtos {

    @Getter @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class PostRequest {
        @JsonProperty("post-title")
        private String postTitle;

        @JsonProperty("post-content")
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