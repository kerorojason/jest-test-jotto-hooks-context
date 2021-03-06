import React from 'react';
import PropTypes from 'prop-types';

import guessedWordsContext from './contexts/guessedWordsContext';
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  const language = React.useContext(languageContext);
  let contents;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test='guess-instructions'>
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr key={index} data-test='guessed-word'>
        <td>{index}</td>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test='guessed-words'>
        <h3> {stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</h3>
        <table className='table table-sm'>
          <thead className='thead-light'>
            <tr>
              <th>#</th>
              <th> {stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'guessedWords')}</th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test='component-guessed-words'>{contents}</div>;
};

// GuessedWords.propTypes = {
//   guessedWords: PropTypes.arrayOf(
//     PropTypes.shape({
//       guessedWord: PropTypes.string.isRequired,
//       letterMatchCount: PropTypes.number.isRequired
//     }).isRequired
//   )
// };

export default GuessedWords;
