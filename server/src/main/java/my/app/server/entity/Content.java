package my.app.server.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Content {
    @Id
    @GeneratedValue
    @Column(name = "content_id")
    private Long id;

    @Column(nullable = false, length = 255)
    private String content;

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
