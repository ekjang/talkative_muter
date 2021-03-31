package my.app.server.lunch.service;

import lombok.RequiredArgsConstructor;
import my.app.server.lunch.dto.LunchDto;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Configuration
@RequiredArgsConstructor
public class LunchService {

    @Transactional
    public List<LunchDto> list(String search) {
        List<LunchDto> lunchDtoList = new ArrayList<>();
        try {
            for (int i = 1; i <= 3; i++) {
                String encodeResult = URLEncoder.encode(search, "UTF-8");
                URL url = new URL("https://dapi.kakao.com/v2/local/search/keyword.json?y=37.40207474911747&x=127.1067572519869&radius=500&query=" + encodeResult + "&page=" + i);

                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Accept", "application/json");
                conn.setRequestProperty("Authorization", "KakaoAK 7aa4518a2eed82fa311a9de9407adb61");
                conn.setRequestProperty("Access-Control-Allow-Origin", "*");
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();

                while ((inputLine = br.readLine()) != null) {
                    response.append(inputLine + "\n");
                }
                ScriptEngineManager sem = new ScriptEngineManager(); //자바스크립트 엔진불러오기
                ScriptEngine engine = sem.getEngineByName("javascript");
                String json = response.toString();
                String script = "Java.asJSONCompatible(" + json + ")";
                Object result = engine.eval(script);            //script 실행한걸 result에 넣기
                Map<String, Object> contents = (Map) result;
                Map<String, Object> meta = (Map) contents.get("meta");
                Integer count = (Integer) meta.get("total_count");
                List<Map> list = (List<Map>) contents.get("documents");

                for (Map m : list) {
                    LunchDto dto = new LunchDto();
                    dto.setName((String) m.get("place_name"));
                    dto.setAddress((String) m.get("place_url"));
                    lunchDtoList.add(dto);
                }
                if (count < 15 || count < 30) break;
            }
        } catch (
                Exception e) {
            System.out.println(e);
        }
        return lunchDtoList;
    }

}
