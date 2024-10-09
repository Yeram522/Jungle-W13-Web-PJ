package jungle.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

@Getter @Setter
public class PostWrapperDto {
    private boolean successful;
    private List<PostDtos.PostResponse> posts;

    public PostWrapperDto(boolean successful, PostDtos.PostResponse post) {
        this.successful = successful;
        this.posts = Collections.singletonList(post);
    }
}
