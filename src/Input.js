import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const handleChange = e => {
    e.preventDefault();
    setCurrentGuess(e.target.value);
  };
  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder='enter guess'
          onChange={handleChange}
        />
        <button
          data-test='submit-button'
          className='btn btn-primary mb-2'
          onClick={e => e.preventDefault()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;
