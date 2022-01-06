import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData";
const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(
    FeedbackData
    //       [
    //     { id: 1, text: "This item is feedback item 1", rating: 10 },
    //     { id: 2, text: "This item is feedback item 2", rating: 7 },
    //     { id: 3, text: "This item is feedback item 3", rating: 4 },
    //   ]
  );
  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });
  //delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  //add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    console.log(newFeedback);
    setFeedback([newFeedback, ...feedback]);
  };
  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  //update feedback item
  const updateFeedback = (id, updItem) => {
    // console.log(id, updItem);
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };
  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
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
export default FeedbackContext;
