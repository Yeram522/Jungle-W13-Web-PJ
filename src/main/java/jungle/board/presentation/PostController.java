package jungle.board.presentation;

import jungle.board.ApiResponse;
import jungle.board.application.PostService;
import jungle.board.dto.PostDtos;
import jungle.board.dto.PostListWrapperDto;
import jungle.board.dto.PostWrapperDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/posts")
    public ApiResponse<Object> createPost(@RequestBody PostDtos.PostRequest request) {
        boolean isSuccessful = postService.createPost(request);
        return ApiResponse.ofSuccess(isSuccessful);
    }

    @GetMapping("/posts-list")
    public ApiResponse<PostListWrapperDto> getAllPosts() {
        List<PostDtos.PostResponse> posts = postService.getAllPost();
        PostListWrapperDto wrapper = new PostListWrapperDto(true, posts);
        return ApiResponse.ofSuccess(wrapper);
    }

    @GetMapping("/posts/{post_id}")
    public ApiResponse<PostWrapperDto> getPost(@PathVariable Long post_id) {
        PostDtos.PostResponse post = postService.getPost(post_id);
        PostWrapperDto wrapper = new PostWrapperDto(true, post);
        return ApiResponse.ofSuccess(wrapper);
    }


}
