package my.app.server.common.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GymMembership {

    @Id
    @GeneratedValue
    @Column(name = "membership_id")
    private Long id;

    private String membershipNumber;

    private LocalDateTime entranceTime;

    private String gender;

    @ColumnDefault("0")
    private int usingStatus;

    public GymMembership(String membershipNumber, String gender) {
        this.membershipNumber = membershipNumber;
        this.gender = gender;
    }
    public void enterGym(LocalDateTime enterTime) {
        this.entranceTime = enterTime;
        this.usingStatus = 1;
    }
    public void exitGym() {
        this.entranceTime = null;
        this.usingStatus = 0;
    }
}
