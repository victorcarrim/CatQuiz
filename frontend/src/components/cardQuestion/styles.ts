import styled from "styled-components";

export const Container = styled.div`
    height: 400px;
    width: 1200px;
    background-color: #29292E;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const Question = styled.p`
    font-size: 50px;
    color: white;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
`

export const Subtitle = styled.p`
    font-size: 20px;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
`

export const Theme = styled.p`
    color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 30px;
    margin-bottom: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    font-size: 25px;
`