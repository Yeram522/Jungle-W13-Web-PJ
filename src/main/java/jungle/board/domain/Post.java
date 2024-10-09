package jungle.board.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Post {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String postTitle;

    @Column(nullable = false, length = 5000)
    private String postContent;

    @Column(nullable = false)
    private String postDate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member postWriter;

    //    public Post(String postTitle, String postContent, Member postWriter) {
//        this.postTitle = postTitle;
//        this.postContent = postContent;
//        this.postWriter = postWriter;
//        this.postDate = LocalDateTime.now();
//    }
    public Post(String postTitle, String postContent) {
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.postDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));
    }
}
