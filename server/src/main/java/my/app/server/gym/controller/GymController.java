package my.app.server.gym.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import my.app.server.gym.dto.GymDto;
import my.app.server.gym.service.GymService;
import my.app.server.today.controller.TodayController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/gym-info")
public class GymController {
    private final GymService gymService;

    @GetMapping("/list")
    public Result contentsTodayList() {
        List<GymMembership> findList = gymService.findAll();
        List<GymDto> collect = findList.stream()
                .map(c -> new GymDto(c.getId(),c.getMembershipNumber(),c.getEntranceTime(),c.getGender(),c.getUsingStatus()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }
}
