package my.app.server.gym.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class GymDto {

    private Long id;

    private String membershipNumber;

    private LocalDateTime entranceTime;

    private String gender;

    private int usingStatus;
}
