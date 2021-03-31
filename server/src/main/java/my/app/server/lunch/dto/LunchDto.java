package my.app.server.lunch.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class LunchDto {

    private Long id;

    private String name;

    private String address;

    public LunchDto() {
    }
}