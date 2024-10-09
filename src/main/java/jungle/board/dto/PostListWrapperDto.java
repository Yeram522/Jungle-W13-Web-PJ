package jungle.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class PostListWrapperDto {
    private boolean successful;
    private List<PostDtos.PostResponse> posts;

    public PostListWrapperDto(boolean successful, List<PostDtos.PostResponse> posts) {
        this.successful = successful;
        this.posts = posts;
    }
}
