import React, { FC, useContext, useEffect, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

interface RatingSelectProps {
  rating: number;
  setRating: (rating: number) => void;
}

const RatingSelect: FC<RatingSelectProps> = ({ rating, setRating }) => {
  const { feedbackEdit } = useContext(FeedbackContext)!;

  const [selected, setSelected] = useState<number | null>(10);

  const onRatingSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(+e.currentTarget.value);
    setRating(+e.currentTarget.value);
  };

  useEffect(() => {
    setSelected(feedbackEdit?.item?.rating!);
  }, [feedbackEdit]);

  const renderRatingBubble = Array.from(Array(10).keys()).map((bubble) => {
    const num = bubble + 1;
    return (
      <li key={bubble}>
        <input
          type='radio'
          name='rating'
          id={`num${num}`}
          value={num}
          onChange={onRatingSelected}
          checked={selected === num}
        />
        <label htmlFor={`num${num}`}>{num}</label>
      </li>
    );
  });

  return <ul className='rating'>{renderRatingBubble}</ul>;
};

RatingSelect.defaultProps = {
  rating: 10,
};

export default RatingSelect;
