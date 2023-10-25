import styled from 'styled-components';

interface ButtonContainerProps {
  status?: 'certo' | 'errado';
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 320px;
  height: 100px;
  background-color: ${props => {
    if (props.status === 'certo') return '#7CFC00';
    if (props.status === 'errado') return '#D2042D'; 
    return '#3498db';
  }};
  color: white; // Cor do texto
  border: none;
  border-radius: 5px;  // Adicione um leve arredondamento ao botão
  font-size: 16px;    // Escolha o tamanho da fonte
  text-align: center;
  line-height: 33px;  // Para manter o espaço entre as linhas para até 3 linhas
  cursor: pointer;
  transition: 0.3s background-color;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 20px;

  &:hover {
    background-color: ${props => {
      if (props.status === 'certo') return '#90EE90';
      if (props.status === 'errado') return '#C41E3A';
      return '#2980b9';
    }};  
  }

  &:focus {
    outline: none;
  }
`;
