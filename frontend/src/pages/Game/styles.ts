import styled from "styled-components";

export const Container = styled.div`
`


export const ContainerButton = styled.div`
    padding: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > button {
    margin-bottom: 30px;
    flex: 0 0 48%;  // Ocupando aproximadamente metade da largura, considerando algum espaço para o 'space-between'.
  }

  & > button:nth-last-child(-n+2) {
    margin-bottom: 0;  // Remove a margem dos dois últimos botões
  }
`;