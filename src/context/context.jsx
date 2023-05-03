import { createContext, useContext } from 'react';

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = '';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ test: 'test' }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
