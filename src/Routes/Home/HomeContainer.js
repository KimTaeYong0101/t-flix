import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";


export default class extends React.Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount(){ //async, await는 자바스크립트한테, 서버로부터 데이터를 갖고오는 것을 끝날떄까지 "거기~나 좀 기다려"라고 말하는 것과 같다. 
                               //async라는 단어를 가진 함수 안에 있지 않으면 await를 사용할 수 없다.
        try{ //성공할떄
           const {
               data: {results: nowPlaying }
            } = await moviesApi.nowPlaying();
           const {
               data: {results: upcoming }
            } = await moviesApi.upcoming();
           const {
               data: { results: popular }
           } = await moviesApi.popular();
           this.setState({
            nowPlaying,
            upcoming,
            popular
           });
           //console.log(this.state.nowPlaying);
        } catch{ //실패할떄
            this.setState({
                error: "Can't find movie information."
            });
        } finally{ //성공, 실패 여부와 관계없이 완료하고 마지막 동작을 취하고 싶을때
            this.setState({
                loading: false
            });
        }
    }

    render() {
       const { nowPlaying, upcoming, popular, error, loading } = this.state;
       //console.log(this.state);
       return (
        <HomePresenter 
            nowPlaying={nowPlaying} 
            upcoming={upcoming} 
            popular={popular} 
            error={error}
            loading={loading}
        />
       );
    }
}
