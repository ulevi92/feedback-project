import { createContext, useContext, FC, useEffect, useState } from "react";
import { FeedbackDataType } from "../data/FeedbackData";

interface FeedbackState {
  feedback?: FeedbackDataType[];

  feedbackEdit?: {
    item?: FeedbackDataType;
    edit: boolean;
  };

  isLoading: boolean;
}

interface FeedbackContextProps extends FeedbackState {
  deleteFeedback: (id: string) => void;
  addFeedback: (newFeedback: FeedbackDataType) => void;
  editFeedback: (item: FeedbackDataType) => void;
  updateFeedback: (id: string, updatedItem: FeedbackDataType) => void;
}

export const FeedbackContext = createContext<FeedbackContextProps | null>(null);

const FeedbackProvider: FC = ({ children }) => {
  const [state, setState] = useState<FeedbackState>({
    feedbackEdit: {
      edit: false,
    },
    isLoading: true,
  });

  const fetchFeedback = async (): Promise<FeedbackDataType[]> => {
    const res = await fetch("/feedback?_sort=id&order=desc");
    return res.json();
  };

  useEffect(() => {
    fetchFeedback().then((feedback) => {
      setState((state) => ({ ...state, feedback }));
    });
    setState((state) => ({ ...state, isLoading: false }));
  }, []);

  const deleteFeedback = async (id: string) => {
    if (window.confirm(`Are you sure?`)) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });

      return setState({
        ...state,
        feedback: state.feedback!.filter((item) => item.id !== id),
      });
    }
  };

  const addFeedback = async (newFeedback: FeedbackDataType) => {
    const res = await fetch("/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFeedback),
    });

    const data: FeedbackDataType = await res.json();

    setState({ ...state, feedback: [data, ...state.feedback!] });
  };

  const editFeedback = (item: FeedbackDataType) => {
    setState({
      ...state,
      feedbackEdit: {
        item,
        edit: true,
      },
    });
  };

  const updateFeedback = async (id: string, updatedItem: FeedbackDataType) => {
    const res = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data: FeedbackDataType = await res.json();

    setState({
      ...state,
      feedback: state.feedback!.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        ...state,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = (): FeedbackContextProps => {
  const ctx = useContext(FeedbackContext);

  if (!ctx) {
    throw new Error(
      "useFeedbackContext must be used within a FeedbackProvider"
    );
  }
  return ctx;
};

export default FeedbackProvider;
