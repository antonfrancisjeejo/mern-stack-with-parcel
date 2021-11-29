import React, { useState } from "react";

const Modal = ({ isActive, setIsActive, addQuestion }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    addQuestion(question);
    setQuestion("");
    setIsActive(false);
  };
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-content bg-white p-5 rounded-md">
        <h2>Add Questions</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-20 border border-gray-300 mt-1 p-2 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-300 text-white font-semibold h-12 rounded-sm w-full text-xl mt-5"
        >
          Submit Question
        </button>
        <button
          onClick={() => setIsActive(false)}
          className="font-semibold h-12 rounded-sm w-full text-xl mt-5"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
