import { FC, useContext } from "react";
import FeedbackItem from "./FeedbackItem";

import { motion, AnimatePresence } from "framer-motion";
import { FeedbackContext } from "../context/FeedbackContext";
import Spinner from "./shared/Spinner";

const FeedbackList: FC = () => {
  const { feedback, isLoading } = useContext(FeedbackContext)!;

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>;
  }

  const FeedbabackRating =
    feedback &&
    feedback.map((item) => {
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FeedbackItem item={item} />
        </motion.div>
      );
    });

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>{FeedbabackRating}</AnimatePresence>
    </div>
  );
};

export default FeedbackList;
