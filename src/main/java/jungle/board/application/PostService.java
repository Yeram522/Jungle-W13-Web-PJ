package jungle.board.application;

import jungle.board.domain.Post;
import jungle.board.dto.PostDtos;
import jungle.board.infrastructure.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public boolean createPost(PostDtos.PostRequest request) {
        Post post = new Post(request.getPostTitle(), request.getPostContent());
        Post savedPost = postRepository.save(post);
        return true;
    }

    public List<PostDtos.PostResponse> getAllPost() {
        return postRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public PostDtos.PostResponse getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return convertToResponse(post);
    }

    private PostDtos.PostResponse convertToResponse(Post post) {
        PostDtos.PostResponse response = new PostDtos.PostResponse();
        response.setId(post.getId());
        response.setPostTitle(post.getPostTitle());
        response.setPostContent(post.getPostContent());
        response.setPostDate(post.getPostDate());
        return response;
    }
}
