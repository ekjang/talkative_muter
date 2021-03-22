package my.app.server.exception.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by ekjan.
 * Date : 2021-03-22 오후 5:58
 */
@Getter
//@Setter
public class ExceptionVo {
    String dialogTitle;
    String errMsg;
    int status;
    List errList;

    public ExceptionVo setDialogTitle(String dialogTitle) {
        this.dialogTitle = dialogTitle;
        return and();
    }

    public ExceptionVo setErrMsg(String errMsg) {
        this.errMsg = errMsg;
        return and();
    }

    public ExceptionVo setStatus(int status) {
        this.status = status;
        return and();
    }

    ExceptionVo setErrList(List errList) {
        this.errList = errList;
        return and();
    }

    public ExceptionVo and() {
        return this;
    }
}
