package my.app.server.today.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class TodayDto {
    private Long id;

    private String content;

    private LocalDateTime registerDate;

    private Long likes;

    private Long dislikes;

    private Long reports;
}
