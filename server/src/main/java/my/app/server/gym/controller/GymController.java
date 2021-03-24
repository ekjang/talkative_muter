package my.app.server.gym.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import my.app.server.common.model.ResData;
import my.app.server.exception.service.CustomException;
import my.app.server.gym.dto.GymDto;
import my.app.server.gym.service.GymService;
import my.app.server.today.controller.TodayController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @PutMapping(value = "/use/{id}")
    public ResData clickUse(@PathVariable("id") Long id, @RequestBody GymController.UpdateReq request) {
        if (request.use == 0) {
            gymService.exitGym(id, request.memberId);
            return new ResData(true, "");
        } else if (request.use == 1) {
            gymService.enterGym(id, request.memberId);
            return new ResData(true, "");
        } else {
            return new ResData(false, "");
        }
    }

    @Data
    static class UpdateReq{
        int use;
        Long memberId;
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }
}
