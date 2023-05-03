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

  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers: {correct}/{index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className='next-question'>next question</button>
      </section>
    </main>
  );
};

export default App;
