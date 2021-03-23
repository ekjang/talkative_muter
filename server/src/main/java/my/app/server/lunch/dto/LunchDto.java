package my.app.server.lunch.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class LunchDto {
    private String restaurant;

    public LunchDto(){
    }

    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }

    @Override
    public String toString() {
        return "LunchDto{" +
                "restaurant='" + restaurant + '\'' +
                '}';
    }
}
