import { useGlobalContext } from './context/context';

import SetupForm from './components/SetupForm';
import Loading from './components/Loading';
import Modal from './components/Modal';

import './App.css';

const App = () => {
  const { waiting, loading, questions, index, correct } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <h1>quiz app</h1>
    </main>
  );
};

export default App;
