package my.app.server.gym.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GymDto {

    private Long id;

    private String membershipNumber;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime entranceTime;

    private String gender;

    private int usingStatus;
}
