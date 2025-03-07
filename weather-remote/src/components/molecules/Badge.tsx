import { ReactNode } from 'react';

interface WeatherCardProps {
  text?: string;
  isLoading?: boolean;
  className?: string;
  icon?: ReactNode;
}

const Badge = ({
  text = '',
  icon,
  className = '',
  isLoading = false,
}: WeatherCardProps) => {
  return (
    <span
      className={`tag is-primary is-medium ${className} ${isLoading ? 'is-skeleton' : ''}`}
    >
      {icon && !isLoading && <span className='icon mr-1'>{icon}</span>}
      {text}
    </span>
  );
};

export { Badge };
