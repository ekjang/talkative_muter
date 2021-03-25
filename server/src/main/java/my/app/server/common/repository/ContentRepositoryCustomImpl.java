package my.app.server.common.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import my.app.server.common.entity.Content;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

import static my.app.server.common.entity.QContent.content1;

public class ContentRepositoryCustomImpl implements ContentRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public ContentRepositoryCustomImpl(EntityManager em) {
        queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Content> stringSearch(String searchString) {
        return queryFactory
                .selectFrom(content1)
                .where(content1.content.contains(searchString))
                .fetch();
    }

    @Override
    public List<Content> stringSearchOneDay(LocalDateTime start, LocalDateTime end, String searchString) {
        return queryFactory
                .selectFrom(content1)
                .where(
                        dateBetween(start,end),
                        stringExit(searchString)
                        )
                .orderBy(content1.registerDate.desc())
                .fetch();
    }

    private BooleanExpression dateBetween(LocalDateTime start, LocalDateTime end) {
        return content1.registerDate.between(start,end);
    }

    private BooleanExpression stringExit(String searchString) {
        return searchString != null ? content1.content.contains(searchString) : null;
    }
}
