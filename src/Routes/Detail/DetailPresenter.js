import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    @media (max-width: 1000px){
        padding: 30px 15px 25px 15px;
    }
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position:center center;
    
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
    @media (max-width: 900px){
        position:fixed;
        background-attachment: scroll;
        
    }
`;

const Content = styled.div`
    display: flex;
    
    width: 100%;
    position:relative;
    z-index: 1;
    height: 100%;
    display: flex;
    @media (max-width: 900px){
        flex-wrap: wrap;
        
    }
`;

const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position:center center;
    
    background-size: cover;
    height: 100%;
    border-radius: 5px;
    background-repeat: no-repeat;
    @media (max-width: 1300px){
        width:100%;
        background-position:center top;
    }
    @media (max-width: 900px){
        width:100%;
        
        background-size: contain;
        
    }
    @media (max-width: 550px){
        background-size:cover;
        height: 80%;
    }
    @media (max-width: 500px){
        
        
    }
    
`;

const Data = styled.span`
    width:70%;
    margin-left: 10px;
    @media (max-width: 1300px){
        width:100%;
        
    }
    @media (max-width: 900px){
        padding:20px 0 40px 0;
    }
`;

const Title = styled.h3`
    font-size: 32px;
  
`;

const ItemContainer = styled.div`
    margin:20px 0;
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    opacity: 0.7;
    line-height: 1.5;
    width: 50%;
    @media (max-width: 900px){
        width: 85%;
    }
`;

const DetailPresenter = ({ result, loading, error,}) => 
    loading ? (
        <>
        <Helmet>
            <title>Loading | T-flix</title>
        </Helmet>
        <Loader /> 
        </>
    ) : (
        <Container>
            <Helmet>
                <title> 
                    {result.original_title ? result.original_title : result.original_name}{" "} 
                    | T-flix</title>
            </Helmet>
            <Backdrop 
                bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} 
            />
            <Content>
                <Cover 
                    bgImage={
                        result.poster_path 
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}` 
                            : require("../../assets/noPosterSmall.png")
                    } 
                />
                <Data>
                    <Title>
                        {result.original_title 
                            ? result.original_title 
                            : result.original_name}
                    </Title>
                    <ItemContainer>
                        <Item>{result.release_date 
                            ? result.release_date.substring(0, 4) 
                            : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>·</Divider>
                        <Item>{result.runtime
                            ? result.runtime 
                            : result.episode_run_time} min
                        </Item>
                        <Divider>·</Divider>
                        <Item>
                            {result.genres && 
                                result.genres.map((genre, index) => 
                                    index === result.genres.length - 1
                                        ? genre.name //마지막에 /를 붙여주지 않기 위해서 있는것이다.
                                        : `${genre.name} / ` //마지막이 아닌것은 /를 붙이기 위해서 있는것이다.
                                )}
                        </Item>
                    </ItemContainer>
                        <Overview>{result.overview}</Overview>
                </Data>
            </Content>
        </Container>
    ); 


DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;