import React from "react";
import NotesCard from "./Card";
import { Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";

const Heading = () => {
  return (
    <div className="flex flex-col items-center p-6 sm:p-8 md:p-10 lg:p-16 bg-purple-50 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-800 mb-4">
          Your Cards, Your Way
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Manage, organize, and track your flashcards effortlessly
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <Link
          to="/cards/create"
          className="group relative inline-flex items-center"
        >
          <FaSquarePlus className="text-5xl text-purple-600 hover:text-purple-800 transition-colors duration-300 ease-in-out" />
        </Link>
      </div>

      <div className="w-full max-w-4xl">
        <NotesCard />
      </div>
    </div>
  );
};

export default Heading;
