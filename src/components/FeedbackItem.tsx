import { FC } from "react";
import { FeedbackDataType } from "../data/FeedbackData";
import Card from "./shared/Card";

import { FaTimes, FaEdit } from "react-icons/fa";
import { useFeedbackContext } from "../context/FeedbackContext";

interface FeedbackItemProps {
  item: FeedbackDataType;
}

const FeedbackItem: FC<FeedbackItemProps> = ({ item }) => {
  const { deleteFeedback, editFeedback } = useFeedbackContext();

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button className='close' onClick={() => deleteFeedback(item.id)}>
        <FaTimes color='purple' />
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  );
};

export default FeedbackItem;
