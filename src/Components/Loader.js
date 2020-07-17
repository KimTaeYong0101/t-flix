import React from "react";
import styled from "styled-components";
//import loading from '../assets/icon_loading.gif';

const Container = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    justify-content: center;
    font-size:28px;
    margin-top: 20px;
    position:fixed;
    @media (max-width: 600px){
        font-size:20px;
    }
`;

export default () => (
    <Container>
        <span role="img" aria-label="Loading">
            {/* <img src={loading} /> ⏰*/}Loading...
        </span> 
    </Container>
);

