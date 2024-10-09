package jungle.board.application;

import jakarta.persistence.EntityNotFoundException;
import jungle.board.domain.Comment;
import jungle.board.domain.Post;
import jungle.board.dto.CommentDto;
import jungle.board.infrastructure.CommentRepository;
import jungle.board.infrastructure.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Transactional
    public boolean createComment(CommentDto commentDto) {
        Post findPost = postRepository.findById(commentDto.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        Comment comment = new Comment(commentDto.getCommentContent(), findPost);
        return true;
    }
}
