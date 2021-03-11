package my.app.server.gym.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import my.app.server.gym.dto.GymDto;
import my.app.server.gym.service.GymService;
import my.app.server.today.controller.TodayController;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/use/{id}")
    public boolean clickUse(@PathVariable("id") Long id, @RequestBody GymController.UpdateReq request) {
        if(request.flag)
            gymService.enterGym(id);
        else
            return false;

        return true;
    }

    @PutMapping("/return/{id}")
    public boolean clickReturn(@PathVariable("id") Long id, @RequestBody GymController.UpdateReq request) {
        if(request.flag)
            gymService.exitGym(id);
        else
            return false;

        return true;
    }

    @Data
    static class UpdateReq{
        boolean flag;

    }


    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T data;
    }
}
