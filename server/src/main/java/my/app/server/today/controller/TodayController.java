package my.app.server.today.controller;

import lombok.RequiredArgsConstructor;
import my.app.server.entity.Content;
import my.app.server.today.service.TodayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/today")
public class TodayController {

    private final TodayService todayService;

    @GetMapping("/contents")
    public List<Content> contentsV1() {
        return todayService.findContents();
    }
}
