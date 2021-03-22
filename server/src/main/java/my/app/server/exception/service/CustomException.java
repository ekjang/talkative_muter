package my.app.server.exception.service;

import my.app.server.exception.model.ExceptionVo;

/**
 * Created by ekjan.
 * Date : 2021-03-22 오후 5:57
 */
public class CustomException extends RuntimeException {
    private final String DIALOG_TITLE = "customException.title";
    private  final int STATUS = 1000;

    int errStatus = 0;

    public CustomException(String message) {
        super(message);
    }

    public CustomException(String message, int status) {
        super(message);
        this.errStatus = status;
    }

    public ExceptionVo getExceptionVo(){
        ExceptionVo exceptionVo = new ExceptionVo();
        exceptionVo.and().setDialogTitle(this.DIALOG_TITLE).and()
                .setErrMsg(super.getMessage()).and();
        if(errStatus == 0 ){
            exceptionVo.and().setStatus(this.STATUS).and();
        } else {
            exceptionVo.and().setStatus(errStatus).and();
        }
        return exceptionVo;

    }
}
