package my.app.server.common.init_data;

import lombok.RequiredArgsConstructor;
import my.app.server.common.entity.GymMembership;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Component
@RequiredArgsConstructor
@Transactional
public class InitGymData {

   private final InitService initService;

    @PostConstruct
    public void init() {
        initService.initData();
    }
    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;

        public void initData() {
            GymMembership gm1 = new GymMembership("010-3473-9077","M");
            em.persist(gm1);
            GymMembership gm2 = new GymMembership("010-3473-9078","M");
            em.persist(gm2);
            GymMembership gm3 = new GymMembership("010-3473-9079", "M");
            em.persist(gm3);
            GymMembership gm4 = new GymMembership("010-3473-9080", "M");
            em.persist(gm4);
            GymMembership gm5 = new GymMembership("010-3473-9081","M");
            em.persist(gm5);
            GymMembership gm6 = new GymMembership("010-3473-9082","M");
            em.persist(gm6);
            GymMembership gm7 = new GymMembership("010-3473-9083","M");
            em.persist(gm7);
            GymMembership gm8 = new GymMembership("010-3473-9084","F");
            em.persist(gm8);
        }
    }

}
