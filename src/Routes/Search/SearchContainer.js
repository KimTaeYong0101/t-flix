import React from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi } from "../../api";
import { tvApi } from "../../api";

export default class extends React.Component{
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        loading: false,
        error: null
    };


    handleSubmit = (event) => {
        event.preventDefault(); //기본동작취소(새로고침되는거 막기)
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.searchByTerm();
        }
    };

    updateTerm = (event) => { //updateTerm함수는 onChange될때마다 매번 실행된다.(SearchPresenter.js  참조)
        const { 
            target: { value } //event객체안에 target이라는 객체가 있는데 이것은 현재 이벤트가 발생한 엘리먼트(Input태그)를 말하고 
        } = event;            //거기안에 value라는 속성을 받아와서 value라는 상수에 대입한다는 뜻이다.
        this.setState({
            searchTerm: value
        });
    };


    //async, await는 자바스크립트한테, 서버로부터 데이터를 갖고오는 것을 끝날떄까지 "거기~나 좀 기다려"라고 말하는 것과 같다. 
    //async라는 단어를 가진 함수 안에 있지 않으면 await를 사용할 수 없다.
    searchByTerm = async() => {
        const { searchTerm } = this.state;
        this.setState({ loading: true });
        try{//성공할떄
            const {
                data: {results: movieResults }
            } = await moviesApi.search(searchTerm);
            const {
                data: {results: tvResults }
            } = await tvApi.search(searchTerm);
            this.setState({
                movieResults,
                tvResults
            });
        } catch{//실패할떄
            this.setState({ error: "Can't find results." });
        } finally{//성공, 실패 여부와 관계없이 완료하고 마지막 동작을 취하고 싶을때
            this.setState({ loading: false });
        }
    };

    render(){
        const { movieResults, tvResults, searchTerm, loading, error } = this.state;
        return( 
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                loading={loading} 
                error={error}
                searchTerm={searchTerm}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}