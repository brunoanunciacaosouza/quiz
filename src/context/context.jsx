import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async (url) => {
    setLoading(true);
    try {
      setWaiting(false);
      const response = await axios.get(url);
      const data = response.data;
      if (data.response_code !== 0) {
        setError(true);
      } else {
        if (data.results.length > 0) {
          setQuestions(data.results);
          setLoading(false);
          setWaiting(false);
          setError(false);
        }
      }
    } catch (error) {
      setWaiting(true);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      }
      return index;
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        quiz,
        nextQuestion,
        checkAnswer,
        openModal,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
