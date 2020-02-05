import React from 'react';
import PropTypes from 'prop-types';

import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers/index';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();

  const handleChange = e => {
    e.preventDefault();
    setCurrentGuess(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCurrentGuess('');
    // update guessedWords
    const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
    const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount }];
    setGuessedWords(newGuessedWords);
    // check against secretWOrd and update success state
    if (currentGuess === secretWord) {
      setSuccess(true);
    }
  };

  if (success) return null;
  return (
    <div data-test='component-input'>
      <form className='form-inline' data-test='input-form' onSubmit={handleSubmit}>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
          onChange={handleChange}
        />
        <button type='submit' className='btn btn-primary mb-2' data-test='submit-button'>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
