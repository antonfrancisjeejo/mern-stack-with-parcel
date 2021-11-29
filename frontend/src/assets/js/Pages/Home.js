import axios from "../axios";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";

const Home = () => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const getQuestions = async () => {
    const response = await axios.get("/api/questions");
    setQuestions(response.data);
    setSelectedQuestion(response.data[0]);
  };
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/account/isLoggedIn");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
        console.log(error);
      }
    };
    checkLoggedIn();
    getQuestions();
  }, []);

  const addQuestion = async (question) => {
    if (question === "") {
      return;
    }
    try {
      await axios.post(
        "/api/questions/add",
        {
          question,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getQuestions();
    } catch (error) {
      console.log(error);
    }
  };

  const addAnswer = async () => {
    if (answer === "") {
      return;
    }
    try {
      const response = await axios.post(
        "/api/questions/answer",
        {
          answer,
          id: selectedQuestion._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setQuestions((prev) => {
        return prev.map((item) => {
          return item._id === selectedQuestion._id ? response.data : item;
        });
      });
      setSelectedQuestion(response.data);
      setAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/account/logout");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden">
      <header className="bg-white border border-gray-300 flex justify-between py-2 px-3">
        <h1 className="font-bold text-4xl">Campuswire Lite</h1>
        {user && (
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-500">Hi, {user}</h2>
            <button
              className="px-2 text-xl font-semibold text-gray-500"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        )}
      </header>
      <div className="flex h-[94vh] overflow-hidden">
        <div className="flex-grow-0 p-5 border-r border-gray-300">
          {user ? (
            <button
              onClick={() => setIsActive(true)}
              className="bg-green-300 text-white font-semibold h-14 rounded-sm w-96 text-xl"
            >
              Add new Question +
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-300 text-white font-semibold h-14 rounded-sm w-96 text-xl"
            >
              Log in to submit a question
            </button>
          )}
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white my-2 border border-gray-300 px-1 py-2 cursor-pointer hover:shadow-lg"
              onClick={() => setSelectedQuestion(question)}
            >
              <h3 className="text-gray-700 font-semibold">
                {question.questionText}
              </h3>
            </div>
          ))}
        </div>
        <div className="flex-grow">
          <div className="border border-gray-300 m-5 bg-white p-3 pb-5">
            <h1 className="text-3xl font-medium text-gray-500">
              {selectedQuestion?.questionText}
            </h1>
            <div className="pt-5">
              <h3 className="font-bold">Author:</h3>
              <p>{selectedQuestion?.author}</p>
            </div>
            <div className="pt-5">
              <h3 className="font-bold">Answer:</h3>
              <p>{selectedQuestion?.answer}</p>
            </div>
          </div>
          {user && (
            <div className="m-5 mt-10">
              <label className="text-gray-600 font-semibold text-xl">
                Answer this question:
              </label>
              <br />
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full h-20 border border-gray-300 mt-1 p-2 outline-none"
              />
              <button
                onClick={addAnswer}
                className="bg-green-300 text-white font-semibold h-12 rounded-sm w-full text-xl mt-5"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal
        isActive={isActive}
        setIsActive={setIsActive}
        addQuestion={addQuestion}
      />
    </div>
  );
};

export default Home;
