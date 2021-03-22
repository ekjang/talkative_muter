package my.app.server.common.model;

import java.util.List;
import java.util.Map;

/**
 * Created by ekjan.
 * Date : 2021-03-22 오후 6:30
 */
public class ResData {
    boolean success = true;
    String message;
    int errCode;

    List<Object> list;       //넘겨줄 데이터 List 형식
    Map map;              //넘겨줄 데이터 Map 형식
    int pageNumber;              //현재 페이지
    int totalCount;              //전체 데이터 수
    int totalPage;               //전체 페이지 수

//    ResData(List resList, Pagination page) {
//        this.list = resList
//        this.pageNumber = page.getPage() // 현재페이지 번호
//        this.totalCount = page.getTotalCnt() // 데이터 수
//        this.totalPage = page.getTotalSize() // 페이지 수 totalSize
//    }

    ResData(List resList) {
        this.list = resList;
    }

    ResData(Map map) {
        this.map = map;
    }

    ResData(String message) {
        this.message = message;
    }

    public ResData(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ResData(boolean success, int errCode, String message) {
        this.success = success;
        this.errCode = errCode;
        this.message = message;
    }
}
