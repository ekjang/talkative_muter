package my.app.server.lunch.controller;

import lombok.RequiredArgsConstructor;
import my.app.server.lunch.dto.LunchDto;
import my.app.server.lunch.service.LunchService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Controller
public class LunchController{
    private final LunchService lunchService;

    @GetMapping("/lunch")
    public String lunchMenu(Model model) throws IOException{
        List<LunchDto> lunchDtoList = lunchService.getRestaurantData();
        model.addAttribute("lunchMenu", lunchDtoList);
        return "lunch";
    }
}