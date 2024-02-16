import { orange } from "@/constants/colors";
import styled, { keyframes } from "styled-components";

interface Props {
  className?: string;
  scale?: number;
}

export function Loader({ className, scale = 1 }: Props) {
  return (
    <LoaderStyled className={className}>
      <Container scale={scale}>
        <Bar scale={scale} />
        <Bar scale={scale} />
        <Bar scale={scale} />
      </Container>
    </LoaderStyled>
  );
}

const DEFAULT_BAR_WIDTH = 16;
const DEFAULT_BAR_HEIGHT = 32;
const BAR_GAP = 8;

interface IBarProps {
  scale: number;
}

const calcBarGap = ({ scale }: IBarProps) => scale * BAR_GAP;
const calcBarWidth = ({ scale }: IBarProps) => scale * DEFAULT_BAR_WIDTH;
const calcBarHeight = ({ scale }: IBarProps) => scale * DEFAULT_BAR_HEIGHT;
const calcMaxBarHeight = ({ scale }: IBarProps) => scale * DEFAULT_BAR_HEIGHT * 2;
const calcContainerWidth = (props: IBarProps) => calcBarWidth(props) * 3 + calcBarGap(props) * 2;

const animation = keyframes`
  0% {
    transform: scaleY(2);
  }
  50%, 100% {
    transform: scaleY(1);
  }
`;

const LoaderStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
`;

export const Container = styled.div<{ scale: number }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${calcBarGap}px;
  width: ${calcContainerWidth}px;
  height: ${calcMaxBarHeight}px;
`;

const Bar = styled.div<{ scale: number }>`
  width: ${calcBarWidth}px;
  height: ${calcBarHeight}px;
  background: ${orange};
  animation: ${animation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;

  &:nth-child(1) {
    animation-delay: -0.24s;
  }

  &:nth-child(2) {
    animation-delay: -0.12s;
  }

  &:nth-child(3) {
    animation-delay: 0;
  }
`;
