package my.app.server.today.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.entity.Content;
import my.app.server.today.dto.TodayDto;
import my.app.server.today.service.TodayService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/today")
public class TodayController {

    private final TodayService todayService;

    @GetMapping("/contents")
    public Result contentsList() {
        List<Content> findContents = todayService.findContents();
        List<TodayDto> collect = findContents.stream()
                .map(c -> new TodayDto(c.getContent(),c.getRegisterDate(),c.getLikes(),c.getDislikes(),c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @PostMapping("/content")
    public boolean saveContent(@RequestBody @Valid CreateContentRequest request) {
        Content content = new Content(request.getContent());
        Long id = todayService.createContent(content);
        if(id > 0){
            return true;
        }
        return false;
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }

    @Data
    static class CreateContentResponse {
        private Long id;

        public CreateContentResponse(Long id) {
            this.id = id;
        }
    }

    @Data
    static class CreateContentRequest {
        private String content;

    }

}
