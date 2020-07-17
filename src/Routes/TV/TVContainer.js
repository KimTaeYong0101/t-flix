import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

export default class extends React.Component{
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null
    };

    async componentDidMount(){ //async, await는 자바스크립트한테, 서버로부터 데이터를 갖고오는 것을 끝날떄까지 "거기~나 좀 기다려"라고 말하는 것과 같다. 
                                //async라는 단어를 가진 함수 안에 있지 않으면 await를 사용할 수 없다.
        try{ //성공할떄
            const {
                data: {results:topRated}
            } = await tvApi.topRated();
            const {
                data: {results:popular}
            } = await tvApi.popular();
            const {
                data: {results:airingToday}
            } = await tvApi.airingToday();
            this.setState({ topRated, popular, airingToday });
        } catch{ //실패할때
            this.setState({
                error: "Can't find TV information."
            })
        } finally { //성공, 실패 여부와 관계없이 완료하고 마지막 동작을 취하고 싶을때
            this.setState({ loading: false });
        }
    }

    render(){
        const { topRated, popular, airingToday, loading, error } = this.state;
        //console.log(this.state);
        return( 
            <TVPresenter 
                topRated={topRated} 
                popular={popular} 
                airingToday={airingToday} 
                loading={loading} 
                error={error}
            />
        );
    }
}



