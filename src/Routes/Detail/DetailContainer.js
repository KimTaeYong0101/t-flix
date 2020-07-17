import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi } from "../../api";
import { tvApi } from "../../api";


export default class extends React.Component {
    constructor(props){
        super(props);
        const {location: {pathname}} = props; //여기서 바로 옆에있는 props는 리엑트router로부터 받아온 정보를 의미한다. props안에 location객체가 있는데 location객체 안에 있는 값들을 pathname이라는 변수에 대입한다는 뜻이다.
        this.state = {                        //(모르겠으면 render안에 있는 console.log(this.props); 실행해서 확인하기)
            result: null,                     //(기본적으로 리엑트router는 route들에게 모든정보를 전달해준다.)
            error: null,                      
            loading: true,
            isMovie: pathname.includes("/movie/") //pathname객체에 /movie/가 있는지 확인하는 것이다. /movie/가 있으면 true, 없으면 false이다.
        };
    }
    

    async componentDidMount(){ //async, await는 자바스크립트한테, 서버로부터 데이터를 갖고오는 것을 끝날떄까지 "거기~나 좀 기다려"라고 말하는 것과 같다. 
        const {                //async라는 단어를 가진 함수 안에 있지 않으면 await를 사용할 수 없다.
            match: {
                params: { id }
            },
            history: {push}
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id); //parseInt함수는 문자열을 NAN으로 바꿔주는 함수이다. 숫자는 해당되지 않음
        if(isNaN(parsedId)){ //옆에 if문은 if(parsedId === NAN)과 동일하다.
            return push("/");
        }
        let result = null;
        try{ //성공할떄
            if(isMovie){
                ({data:result} = await moviesApi.movieDetail(parsedId)); 
                //data객체를 result에 대입을 하는 코드인데 {data:result} = await moviesApi.movieDetail(parsedId)에서 양쪽 끝을 소괄호()로 감싸져있다. 이렇게 하면 const = {data:result} = await moviesApi.movieDetail(parsedId) 하는 것과 같다. 
            } else {
                ({data:result} = await tvApi.showDetail(parsedId));
                //위에 주석참조
            }
        } catch{ //실패할떄
            this.setState({ error:"Can't find anything." })
        } finally { //성공, 실패 여부와 관계없이 완료하고 마지막 동작을 취하고 싶을때
            this.setState({loading: false, result});
        }
    }

    render() {
        //console.log(this.props);
       const { result, error, loading } = this.state;
       //console.log(this.state);
       //console.log(result);
       return (
        <DetailPresenter result={result} error={error} loading={loading} />
       );
    }
}
