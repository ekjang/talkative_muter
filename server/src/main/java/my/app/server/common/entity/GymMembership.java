package my.app.server.common.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GymMembership {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "membership_id")
    private Long id;

    private String membershipNumber;

    private LocalDateTime entranceTime;

    private String gender;

    @ColumnDefault("0")
    private int usingStatus;

    private Long memberId;

    public GymMembership(String membershipNumber, String gender) {
        this.membershipNumber = membershipNumber;
        this.gender = gender;
    }
    public void enterGym(LocalDateTime enterTime, Long memberId) {
        this.entranceTime = enterTime;
        this.usingStatus = 1;
        this.memberId = memberId;
    }
    public void exitGym() {
        this.entranceTime = null;
        this.usingStatus = 0;
        this.memberId = null;
    }
}
