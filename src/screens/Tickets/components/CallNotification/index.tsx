import { red } from "@/constants/colors";
import styled, { keyframes } from "styled-components";

interface Props {
  className?: string;
}

export function CallNotification({ className }: Props) {
  return (
    <CallNotificationStyled className={className}>
      <Circle />
      <Circle />
      <Circle />
    </CallNotificationStyled>
  )
}

const animation = keyframes`
  0% {
    opacity: .5;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
`;

const CallNotificationStyled = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
`;

const Circle = styled.div`
  animation: ${animation} 2s infinite ease-out;
  background-color: ${red};
  border-radius: 50%;
  height: 100%;
  opacity: 0;
  position: absolute;
  width: 100%;

  &:nth-child(1) {
    animation-delay: 1s;
  }

  &:nth-child(2) {
    animation-delay: 1.5s;
  }

  &:nth-child(3) {
    animation-delay: 2s;
  }
`;
