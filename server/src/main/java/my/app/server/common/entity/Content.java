package my.app.server.common.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "content_id")
    private Long id;

    @Column(nullable = false, length = 255)
    private String content;

    //@CreatedDate
    @ColumnDefault("CURRENT_TIMESTAMP")
    private LocalDateTime registerDate;

    //@Column(nullable = false)
    @ColumnDefault("0")
    private Long likes;

    //@Column(nullable = false)
    @ColumnDefault("0")
    private Long dislikes;

    //@Column(nullable = false)
    @ColumnDefault("0")
    private Long reports;

    public Content(String content) {
        this.content = content;
    }
}
