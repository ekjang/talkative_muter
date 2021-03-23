package my.app.server.common.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

/**
 * Response Class
 * Created by ekjan.
 * Date : 2021-03-22 오후 6:30
 */
@Getter
@Setter
public class ResData {
    boolean success = true;
    String message;
    int errCode;

    List<Object> list;       //넘겨줄 데이터 List 형식
    Map map;              //넘겨줄 데이터 Map 형식

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
