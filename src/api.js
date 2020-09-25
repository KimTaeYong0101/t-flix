import axios from "axios";

const api = axios.create({ //axios는 반복적인 작업을 수행하지 않도록 해주는 역할도 하고 있다. 
    baseURL:"https://api.themoviedb.org/3/",
    params: {
        api_key: "866e368f498c8454ee958d4e1fe1e9e8",
        language: "en-US"
    }
});



export const moviesApi = {
    nowPlaying: () => api.get("movie/now_playing"), //nowPlaying함수가 실행되면 api상수(위에서 정의한 axios를 말한다)에 get함수가 실행되는데 여기서 get은 http메소드 get을 의미하고 movie/now_playing에 해당하는 정보를 get방식으로 리퀘스트하는 것이다. 실제로 리퀘스트하게되는 url은 위에있는 api상수를 합쳐서 (https://api.themoviedb.org/3/movie/now_playing?api_key=866e368f498c8454ee958d4e1fe1e9e8&language=en-US&page=1)이렇게 된다.  
    upcoming: () => api.get("movie/upcoming"), //위에 것과 동일
    popular: () => api.get("movie/popular"), //위에 것과 동일
    movieDetail: id =>
      api.get(`movie/${id}`, {
        params: {
            append_to_response: "videos" //이것은 video(여기서의 video는 예고편을 말하는거 같다)가 있는 tv,movie가 있으면 video를 리퀘스트해달라는 것이다
        }
    }),
    search: term =>  //term은 search페이지에서 사용자가 검색할 때 검색한 문자를 term매개변수가 받는 것이다. 
      api.get("search/movie", {
        params: {
            query: encodeURIComponent(term) //encodeURIComponent는 문자열처리를 위한것이다.(모르면 검색) 
        }
    })
};

export const tvApi = {
    topRated: () => api.get("tv/top_rated"), //위에 nowPlaying과 동일
    popular: () => api.get("tv/popular"), //위에 nowPlaying과 동일
    airingToday: () => api.get("tv/airing_today"), //위에 nowPlaying과 동일
    showDetail: id => 
      api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos" //이것은 video(여기서의 video는 예고편을 말하는거 같다)가 있는 tv,movie가 있으면 video를 리퀘스트해달라는 것이다
        }
    }),
    search: term => //term은 search페이지에서 사용자가 검색할 때 검색한 문자를 term매개변수가 받는 것이다.
      api.get("search/tv", {
        params: {
            query: encodeURIComponent(term) //encodeURIComponent는 문자열처리를 위한것이다.(모르면 검색) 
        }
    })
};