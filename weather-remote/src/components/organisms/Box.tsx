import { ReactNode } from 'react';

interface BoxProps {
  className?: string;
  render: () => ReactNode;
}

const Box = ({ className = '', render }: BoxProps) => {
  return <div className={`box ${className}`}>{render()}</div>;
};

export { Box };
