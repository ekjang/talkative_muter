package my.app.server.lunch.controller;

import lombok.RequiredArgsConstructor;
import my.app.server.common.model.ResData;
import my.app.server.lunch.service.LunchService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/lunch")
public class LunchController{
    private final LunchService lunchService;

    @GetMapping("/list")
    public ResData saveLunchDto(@RequestParam String search){
         return new ResData(lunchService.list(search));
    }

}
