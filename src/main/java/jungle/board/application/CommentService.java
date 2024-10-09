package jungle.board.application;

import jakarta.persistence.EntityNotFoundException;
import jungle.board.domain.Comment;
import jungle.board.domain.Post;
import jungle.board.dto.CommentDtos;
import jungle.board.infrastructure.CommentRepository;
import jungle.board.infrastructure.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;


    @Transactional
    public boolean createComment(CommentDtos.CommentRequest commentRequest) {
        Post findPost = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        Comment comment = new Comment(commentRequest.getCommentContent(), findPost);
        commentRepository.save(comment);
        return true;
    }

    public List<CommentDtos.CommentResponse> getPostComment(Long postId) {
        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        List<Comment> comments = commentRepository.findByPost(findPost);

        return comments.stream()
                .map(comment -> {
                    CommentDtos.CommentResponse response = new CommentDtos.CommentResponse();
                    response.setCommentContent(comment.getCommentContent());
                    response.setCommentDate(comment.getCommentDate());
                    return response;
                }).collect(Collectors.toList());
    }
}
