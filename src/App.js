import React from 'react';
import './App.css';
// import { getSecretWord } from './actions/hookActions';
import hookAction from './actions/hookActions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import Input from './Input';
import LanguagePicker from './LanguagePicker';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';

function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return {
        ...state,
        secretWord: action.payload
      };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null, language: 'en' });

  const setSecretWord = secretWord => {
    dispatch({ type: 'setSecretWord', payload: secretWord });
  };
  const setLanguage = language => {
    dispatch({ type: 'setLanguage', payload: language });
  };

  React.useEffect(() => {
    // getSecretWord(setSecretWord);
    hookAction.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className='container' data-test='component-spinner'>
        <div className='spinner-border' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <p>the secret word is {state.secretWord}</p>
      <languageContext.Provider data-test='context-provider' value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord}></Input>
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
