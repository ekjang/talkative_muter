package my.app.testserver.api

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Created by ekjan.
 *   Date : 2021-03-04 오전 10:12
 */
@CrossOrigin
@RestController
@RequestMapping("/today")
class ApiController {
    @GetMapping("/list")
    def getList() {

        List list = new ArrayList()

        ApiVo data1 = new ApiVo()
//        data1.id = 1
        data1.content = "test contents1"
//        data1.registerDate ="yyyy-mm-dd HH:mm:ss.sss"
//        data1.likes = 0
//        data1.dislikes = 0
//        data1.reports = 0
        list.add(data1)

        ApiVo data2 = new ApiVo()
//        data2.id = 2
        data2.content = "test contents2"
//        data2.registerDate ="yyyy-mm-dd HH:mm:ss.sss"
//        data2.likes = 0
//        data2.dislikes = 0
//        data2.reports = 0
        list.add(data2)

//        return ["list" : [["content": "test1"],["content":"test2"]]]
        return [["content": "test1"],["content":"test2"]]
    }
}
