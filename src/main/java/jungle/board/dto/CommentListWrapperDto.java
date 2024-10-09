package jungle.board.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class CommentListWrapperDto {
    private boolean successful;
    private List<CommentDtos.CommentResponse> comments;

    public CommentListWrapperDto(boolean successful, List<CommentDtos.CommentResponse> comments) {
        this.successful = successful;
        this.comments = comments;
    }
}
