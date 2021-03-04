package my.app.testserver.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by ekjan.
 *   Date : 2021-03-04 오전 10:21
 */
@RestController
@RequestMapping("/")
class HomeController {
    @GetMapping("/")
    def main() {
        return "default!"
    }
    @GetMapping("/home")
    def home() {
        return "home!"
    }
}
