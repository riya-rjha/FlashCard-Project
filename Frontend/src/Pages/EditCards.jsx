import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { IoChevronBackCircle } from 'react-icons/io5';

const EditCards = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const URL = `${import.meta.env.VITE_baseURL}/cards/${id}`;
  const data = { question, answer };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(URL);
        setQuestion(response.data.question);
        setAnswer(response.data.answer);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching card details:', error);
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [URL]);

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      await axios.put(URL, data);
      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error updating card:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-purple-50 flex items-center justify-center p-4'>
      <div className='absolute top-5 left-5'>
        <Link to='/'>
          <IoChevronBackCircle className='text-4xl text-purple-600 hover:text-purple-800 transition-transform transform hover:scale-105' />
        </Link>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-lg'>
          <h2 className='text-2xl font-bold text-purple-700 mb-6 text-center'>
            Edit Card
          </h2>
          <div className='mb-4'>
            <label className='block text-lg font-semibold text-purple-600 mb-2' htmlFor='Question'>
              Question:
            </label>
            <input
              type='text'
              id='Question'
              className='w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label className='block text-lg font-semibold text-purple-600 mb-2' htmlFor='Answer'>
              Answer:
            </label>
            <textarea
              id='Answer'
              className='w-full h-[150px] p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button
            className='w-full bg-purple-600 text-white p-3 rounded-md font-semibold hover:bg-purple-700 transition duration-200'
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCards;
