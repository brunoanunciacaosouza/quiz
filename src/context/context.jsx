import { createContext, useContext, useState } from 'react';

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = '';
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
