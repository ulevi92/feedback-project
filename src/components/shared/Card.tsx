import { FC } from "react";

interface CardProps {
  reverse?: boolean;
}

const Card: FC<CardProps> = ({ children, reverse }) => {
  return reverse ? (
    <div className='card reverse'>{children}</div>
  ) : (
    <div className='card'>{children}</div>
  );
};

export default Card;
