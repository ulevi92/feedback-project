import { FC, useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackStats: FC = () => {
  const { feedback } = useContext(FeedbackContext)!;

  const average =
    feedback &&
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback!.length;

  return (
    <div className='feedback-stats'>
      <h4>{feedback && feedback.length} Reviews</h4>
      <h4>
        Average Rating:{" "}
        {isNaN(average!) ? 0 : average!.toFixed(1).replace(/[..]0$/, "")}
      </h4>
    </div>
  );
};

export default FeedbackStats;
