import React from 'react';
import { ButtonContainer } from './styles';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  status?: 'certo' | 'errado';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, status }) => {
  return <ButtonContainer onClick={onClick} status={status}>{text}</ButtonContainer>;
};

export default Button;
