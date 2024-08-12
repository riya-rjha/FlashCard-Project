import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { IoChevronBackCircle } from "react-icons/io5";

const DeleteCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_baseURL}/cards/${id}`);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting note:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50 p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
          <div className="absolute top-5 left-5">
            <Link to="/">
              <IoChevronBackCircle className="text-4xl text-purple-600 hover:text-purple-800 transition-transform transform hover:scale-105" />
            </Link>
          </div>
          <p className="text-2xl text-purple-700 font-bold text-center mb-6">
            Are you sure you want to delete the note you created? Please
            reconsider and then click the button below.
          </p>
          <button
            type="button"
            className="w-full bg-purple-600 text-white text-2xl font-semibold py-3 rounded-md hover:bg-purple-700 transition duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteCards;
