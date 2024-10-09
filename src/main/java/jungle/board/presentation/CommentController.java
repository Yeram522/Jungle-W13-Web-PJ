package jungle.board.presentation;

import jungle.board.ApiResponse;
import jungle.board.application.CommentService;
import jungle.board.dto.CommentDtos;
import jungle.board.dto.CommentListWrapperDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/posts/{post_id}/comments-list")
    public ApiResponse<CommentListWrapperDto> getAllComments(@PathVariable Long post_id) {
        List<CommentDtos.CommentResponse> comments = commentService.getPostComment(post_id);
        CommentListWrapperDto wrapper = new CommentListWrapperDto(true, comments);
        return ApiResponse.ofSuccess(wrapper);
    }

    @PostMapping("/comments")
    public ApiResponse<Object> createComment(@RequestBody CommentDtos.CommentRequest request) {
        boolean isSuccessful = commentService.createComment(request);
        return ApiResponse.ofSuccess(isSuccessful);
    }
}
