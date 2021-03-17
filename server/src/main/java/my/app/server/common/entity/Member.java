package my.app.server.common.entity;

import lombok.*;
import my.app.server.common.entity.enums.AuthStatus;
import my.app.server.common.entity.enums.Gender;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter @Setter
@ToString(of = {"id", "username"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
public class Member extends BaseTimeEntity{
    @Id
    @Column(name = "member_id")
    private Long id;

    @Column(length = 255)
    private String ageRange;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    @ColumnDefault("'AUTH_NOK'")
    @Enumerated(EnumType.STRING)
    private AuthStatus isAuth;

    public Member(Long id, String ageRange, Gender gender) {
        this.id = id;
        this.ageRange = ageRange;
        this.gender = gender;
    }
}
