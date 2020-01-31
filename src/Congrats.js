import React from 'react';
import PropTypes from 'prop-types';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';

const Congrats = props => {
  const language = React.useContext(languageContext);

  if (props.success) {
    return (
      <div data-test='component-congrats' className='alert alert-success'>
        <span data-test='congrats-message'>
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
  } else {
    return <div data-test='component-congrats'></div>;
  }
};

Congrats.propTypes = {
  success: PropTypes.bool
};
export default Congrats;
