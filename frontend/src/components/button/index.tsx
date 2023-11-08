import React from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  status?: 'certo' | 'errado';
  isCorrect?: boolean;
  shouldBlink?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, status, isCorrect, shouldBlink }) => {
  return <ButtonContainer onClick={onClick} status={status} isCorrect={isCorrect} >{text}</ButtonContainer>;
};

export default Button;
