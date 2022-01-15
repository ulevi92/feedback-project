import React, { useContext, useEffect, useRef, useState } from "react";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";

import { v4 as uuidv4 } from "uuid";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackForm = () => {
  const [text, setText] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(10);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null)!;

  const { addFeedback, updateFeedback, feedbackEdit } =
    useContext(FeedbackContext)!;

  useEffect(() => {
    if (feedbackEdit?.edit) {
      setBtnDisabled(false);
      setText(feedbackEdit.item?.text!);
      setRating(feedbackEdit.item?.rating!);
    }

    return () => {};
  }, [feedbackEdit]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setBtnDisabled(true);
      setMessage(null);
    } else if (e.target.value !== "" && e.target.value.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  const onRatingSelect = (rating: number) => {
    setRating(rating);
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating < 1 || !rating) return setMessage(`Don't forget to rate us :)`);

    if (text.trim().length >= 10 && rating) {
      setMessage(null);

      const id = uuidv4();

      const newFeedback = {
        text,
        rating,
        id,
      };

      if (feedbackEdit?.edit) {
        updateFeedback(feedbackEdit.item?.id!, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
    }
  };

  return (
    <Card>
      <form onSubmit={onFormSubmit}>
        <h2>Rate our service with us</h2>

        <RatingSelect rating={rating} setRating={onRatingSelect} />

        <div className='input-group'>
          <input
            ref={inputRef}
            onChange={onInputChange}
            type='text'
            placeholder='write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
