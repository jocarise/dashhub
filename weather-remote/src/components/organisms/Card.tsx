import { ReactNode } from 'react';
import './Card.scss';

interface CardProps {
  render: () => ReactNode;
}

const Card = (props: CardProps) => {
  const { render, ...propsRest } = props;

  return (
    <div className='card p-5 card_container' {...propsRest}>
      {render()}
    </div>
  );
};

export { Card };
