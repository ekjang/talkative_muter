package my.app.server.lunch.service;


import my.app.server.lunch.dto.LunchDto;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class LunchService {
    private static String RESTAURANT_DATA_URL = "https://www.google.com/search?hl=ko&tbs=lf:1,lf_ui:9&tbm=lcl&sxsrf=ALeKk01l5kLJ1h816JX7L72pqgs8_wdHWg:1616397866453&q=%EC%9C%A0%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4+%EC%A0%90%EC%8B%AC+%EB%A7%9B%EC%A7%91&rflfq=1&num=10&sa=X&ved=2ahUKEwiux5Slr8PvAhWTFIgKHRiDA7wQjGp6BAgIEE8&biw=1071&bih=1076#rlfi=hd:;si:;mv:[[37.404032199999996,127.1093441],[37.3999622,127.10585490000001]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3,lf:1,lf_ui:9";

    @PostConstruct
    public List<LunchDto> getRestaurantData() throws IOException {
        Document doc = Jsoup.connect(RESTAURANT_DATA_URL).get();
        Elements elements = doc.select("div.dbg0pd");
        List<LunchDto> lunchDtoList = new ArrayList<>();

        for(Element element : elements){
            LunchDto lunchDto = new LunchDto();
            String title = element.text();
            lunchDto.setRestaurant(title);
            lunchDtoList.add(lunchDto);
        }
        /*for(int i = 0; i<lunchDtoList.size(); i++){
            System.out.println(lunchDtoList.get(i).toString());
        }*/
        return lunchDtoList;
    }
}
