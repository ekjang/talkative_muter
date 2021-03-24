package my.app.server.popular.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.Content;
import my.app.server.popular.dto.PopularDto;
import my.app.server.popular.service.PopularService;
import my.app.server.today.controller.TodayController;
import my.app.server.today.dto.TodayDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/popular")
public class PopularController {

    private final PopularService popularService;

    @GetMapping("/list")
    public Result popularList() {
        List<Content> findPopulars = popularService.findAllLastWeekPopular();
        List<PopularDto> collect = findPopulars.stream()
                .map(c -> new PopularDto(c.getId(), c.getContent(), c.getRegisterDate(), c.getLikes(), c.getDislikes(), c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @GetMapping("/contentsLimit")
    public Result popularListTop(String limit, String today) {
        List<Content> findPopulars = popularService.findTop5LastWeekPopular();
        List<PopularDto> collect = findPopulars.stream()
                .map(c -> new PopularDto(c.getId(), c.getContent(), c.getRegisterDate(), c.getLikes(), c.getDislikes(), c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

        @Data
        @AllArgsConstructor
        static class Result<T> {
            private T data;
        }
}
