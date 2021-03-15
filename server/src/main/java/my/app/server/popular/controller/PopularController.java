package my.app.server.popular.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.Content;
import my.app.server.popular.dto.PopularDto;
import my.app.server.popular.service.PopularService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/popular")
public class PopularController {

    private final PopularService popularService;

    @GetMapping("/list")
    public Result popularList() {
        List<Content> findContents = popularService.findTop5LastWeekPopular();
        List<PopularDto> collect = findContents.stream()
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
