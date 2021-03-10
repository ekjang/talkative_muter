package my.app.server.today.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.entity.Content;
import my.app.server.today.dto.TodayDto;
import my.app.server.today.service.TodayService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/today")
public class TodayController {

    private final TodayService todayService;

    @PutMapping("/content/like/{id}")
    public boolean clickLikes(@PathVariable("id") Long id, @RequestBody UpdateReq request) {

        if(request.flag)
            todayService.plusLike(id);
        else
            todayService.minusLike(id);

        return true;
    }

    @PutMapping("/content/dislike/{id}")
    public boolean clickDislikes(@PathVariable("id") Long id, @RequestBody UpdateReq request) {

        if(request.flag)
            todayService.plusDislike(id);
        else
            todayService.minusDislike(id);
        return true;
    }

    @PutMapping("/content/report/{id}")
    public boolean clickReports(@PathVariable("id") Long id, @RequestBody UpdateReq request) {

        if(request.flag)
            todayService.plusReport(id);
        else
            todayService.minusReport(id);
        return true;
    }

    @Data
    static class UpdateReq{
        boolean flag;

    }

/*    @GetMapping("/contents")
    public Result contentsList() {
        List<Content> findContents = todayService.findContentsOrderByRegDate();
        List<TodayDto> collect = findContents.stream()
                .map(c -> new TodayDto(c.getId(),c.getContent(),c.getRegisterDate(),c.getLikes(),c.getDislikes(),c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }*/

    @GetMapping("/contentsTop5")
    public Result contentsListTop5() {
        List<Content> findContents = todayService.findContentsTop5OrderByRegDate();
        List<TodayDto> collect = findContents.stream()
                .map(c -> new TodayDto(c.getId(),c.getContent(),c.getRegisterDate(),c.getLikes(),c.getDislikes(),c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @GetMapping("/contentsLimit")
    public Result contentsListTop(String limit, String today) {
        //registerDate 로 sort 후 limit 조회
        PageRequest pageRequest = PageRequest.of(0, Integer.parseInt(limit) , Sort.by("registerDate").descending());
        Page<Content> findContents = todayService.findAll(pageRequest);

        List<TodayDto> collect = findContents.getContent().stream()
                .map(c -> new TodayDto(c.getId(),c.getContent(),c.getRegisterDate(),c.getLikes(),c.getDislikes(),c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @GetMapping("/list")
    public Result contentsTodayList(String today) {
        List<Content> findContents = todayService.findOneDayContents(today);

        List<TodayDto> collect = findContents.stream()
                .map(c -> new TodayDto(c.getId(),c.getContent(),c.getRegisterDate(),c.getLikes(),c.getDislikes(),c.getReports()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @GetMapping("/newCount")
    public String countNew() {
        List<Content> findContents = todayService.find10MinsContents();
        return  String.valueOf(findContents.size());
    }

    @GetMapping("/todayCount")
    public String countToday(String today) {
        List<Content> findContents = todayService.findOneDayContents(today);
        return  String.valueOf(findContents.size());
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
