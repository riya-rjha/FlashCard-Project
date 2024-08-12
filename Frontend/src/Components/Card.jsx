import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner.jsx";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const NotesCard = () => {
  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [flashCardCount, setFlashCardCount] = useState(0);
  const [ques, setQues] = useState(true);

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_baseURL}/cards/`
      );
      setCards(response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const showNextCard = () => {
    setFlashCardCount((prev) => (prev + 1) % cards.length);
  };

  const showPreviousCard = () => {
    setFlashCardCount((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const springProps = useSpring({
    transform: `translateX(-${flashCardCount * 100}%)`,
    config: { tension: 300, friction: 30 },
  });

  const handleQs = () => {
    if (ques) {
      setQues(false);
    } else {
      setQues(true);
    }
  };

  return (
    <div className="relative bg-gray-100 p-6">
      {isLoading ? (
        <Spinner />
      ) : (
        <>

        {cards.length === 0 && (
          <p className="text-red-600 text-center text-2xl">Nothing to show here!</p>
        )}

          {cards.length > 0 && (
            <div className="overflow-hidden">
              <animated.div style={springProps} className="flex">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    className="bg-gradient-to-r from-purple-200 to-purple-300 text-gray-800 border border-purple-300 rounded-lg shadow-md p-6 flex-none w-full mt-6"
                  >
                    <div className="text-3xl font-bold" onClick={handleQs}>
                      <span className="font-bold text-3xl">S.No:</span>{" "}
                      {index + 1}
                    </div>
                    <div className="text-xl mt-4">
                      {ques ? (
                        <p className="font-bold">
                          Question:{" "}
                          <span className="font-normal">{card.question}</span>
                        </p>
                      ) : (
                        <p className="font-bold">
                          Answer:{" "}
                          <span className="font-normal">{card.answer}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-start justify-start mt-4 text-2xl">
                      {" "}
                      <Link to={`/cards/edit/${card._id}`}>
                        <MdEdit className="cursor-pointer text-4xl text-green-500 transition-colors mx-2" />
                      </Link>
                      <Link to={`/cards/delete/${card._id}`}>
                        <MdDelete className="cursor-pointer text-4xl text-red-500 transition-colors mx-2" />
                      </Link>
                    </div>
                  </div>
                ))}
              </animated.div>
            </div>
          )}

          <div className="flex items-center justify-center gap-10 mt-8">
            <FaArrowCircleLeft
              className="cursor-pointer hover:text-purple-800 transition-all delay-75 text-[50px] text-purple-700"
              onClick={showPreviousCard}
            />
            <FaArrowCircleRight
              className="cursor-pointer hover:text-purple-800 transition-all delay-75 text-[50px] text-purple-700"
              onClick={showNextCard}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NotesCard;
