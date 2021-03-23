package my.app.server.exception.service;

import my.app.server.common.model.ResData;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 오류 핸들러 정의
 * Created by ekjan.
 * Date : 2021-03-22 오후 6:29
 */
@RestControllerAdvice
public class ExceptionAdvisor {
    @ExceptionHandler(Exception.class)
    ResData commonError(Exception exception) {
        return new ResData(false, exception.toString());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(CustomException.class)
    ResData customError(CustomException exception) {
        return new ResData(false, exception.errStatus, exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResData processValidationError(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();

        StringBuilder builder = new StringBuilder();
        for(FieldError fieldError: bindingResult.getFieldErrors()) {
            builder.append("[");
            builder.append((fieldError.getField()));
            builder.append("](은)는 ");
            builder.append(fieldError.getDefaultMessage());
            builder.append(" 입력된 값: [");
            builder.append(fieldError.getRejectedValue());
            builder.append("]");
        }

        return new ResData(false, builder.toString());
    }
}
