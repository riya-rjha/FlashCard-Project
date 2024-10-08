import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner.jsx";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const NotesCard = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flashCardCount, setFlashCardCount] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
    setFlipped(false);
  };

  const showPreviousCard = () => {
    setFlashCardCount((prev) => (prev - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { tension: 300, friction: 30 },
  });

  return (
    <div className="relative bg-gray-100 p-6">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {cards.length === 0 && (
            <p className="text-red-600 text-center text-2xl">
              Nothing to show here!
            </p>
          )}

          {cards.length > 0 && (
            <div className="relative w-full min-h-[50vh] h-auto perspective">
              <animated.div
                className="absolute w-full"
                style={{
                  transform,
                  transformStyle: "preserve-3d",
                }}
                onClick={handleFlip}
              >
                <div
                  className="absolute w-full min-h-[50vh] h-auto bg-gradient-to-r from-purple-200 to-purple-300 text-gray-800 border border-purple-300 rounded-lg shadow-md p-6 backface-hidden cursor-pointer hover:shadow-xl transition-transform duration-300 ease-in-out"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-2xl font-bold">
                    <span className="font-bold text-3xl">S.No:</span>{" "}
                    {flashCardCount + 1}
                  </div>
                  <div className="text-lg mt-4">
                    <p className="font-bold">
                      <span className="text-green-700">Question: </span>
                      <span className="font-normal">
                        {cards[flashCardCount].question}
                      </span>
                    </p>
                  </div>{" "}
                  <div className="flex items-center justify-start mt-4 text-2xl absolute top-4 right-4">
                    <Link to={`/cards/edit/${cards[flashCardCount]._id}`}>
                      <MdEdit className="cursor-pointer text-4xl text-green-500 transition-colors mx-2" />
                    </Link>
                    <Link to={`/cards/delete/${cards[flashCardCount]._id}`}>
                      <MdDelete className="cursor-pointer text-4xl text-red-500 transition-colors mx-2" />
                    </Link>
                  </div>
                </div>

                <animated.div
                  className="relative w-full min-h-[50vh] h-auto bg-gradient-to-r from-purple-200 to-purple-300 text-gray-800 border border-purple-300 rounded-lg shadow-md p-6 backface-hidden cursor-pointer hover:shadow-xl transition-transform duration-300 ease-in-out"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    opacity,
                  }}
                >
                  <div className="text-2xl font-bold">
                    <span className="font-bold text-3xl">S.No:</span>{" "}
                    {flashCardCount + 1}
                  </div>
                  <div className="text-lg mt-4">
                    <p className="font-bold">
                      <span className="text-green-700">Answer: </span>
                      <span className="font-normal">
                        {cards[flashCardCount].answer}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-start mt-4 text-2xl absolute top-4 right-4">
                    <Link to={`/cards/edit/${cards[flashCardCount]._id}`}>
                      <MdEdit className="cursor-pointer text-4xl text-green-500 transition-colors mx-2" />
                    </Link>
                    <Link to={`/cards/delete/${cards[flashCardCount]._id}`}>
                      <MdDelete className="cursor-pointer text-4xl text-red-500 transition-colors mx-2" />
                    </Link>
                  </div>
                </animated.div>
              </animated.div>
            </div>
          )}

          <div className="flex items-center justify-center gap-10 mt-6">
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
