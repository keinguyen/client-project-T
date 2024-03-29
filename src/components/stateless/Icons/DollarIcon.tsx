interface Props {
  className?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}

export function DollarIcon({
  className,
  width = 16,
  height = width,
  color,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path d="M240 32c-132.548 0-240 107.452-240 240s107.452 240 240 240c132.549 0 240-107.451 240-240s-107.451-240-240-240zM240 464c-106.039 0-192-85.961-192-192s85.961-192 192-192c106.039 0 192 85.961 192 192s-85.961 192-192 192zM256 256v-64h64v-32h-64v-32h-32v32h-64v128h64v64h-64v32h64v32h32v-32h64.001l-0.001-128h-64zM224 256h-32v-64h32v64zM288.001 352h-32.001v-64h32.001v64z" stroke={color} />
    </svg>
  )
}
