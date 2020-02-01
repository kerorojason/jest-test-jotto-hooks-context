import React from 'react';
import PropTypes from 'prop-types';

import stringsModule from './helpers/strings';
import languageContext from './contexts/languageContext';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(languageContext);
  const handleChange = e => {
    e.preventDefault();
    setCurrentGuess(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setCurrentGuess('');
    // TODO: update guessedWords
    // TODO: check against secretWOrd and update success state
  };

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
        <button
          className='btn btn-primary mb-2'
          data-test='submit-button'
          onClick={e => e.preventDefault()}
        >
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
