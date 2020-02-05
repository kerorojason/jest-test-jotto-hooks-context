import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testutils';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';
import Input from './Input';

const setup = ({ secretWord, language, success }) => {
  secretWord = secretWord || 'party';
  language = language || 'en';
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.GuessedWordsProvider>
        <successContext.SuccessProvider value={[success, jest.fn()]}>
          <Input secretWord={secretWord} />
        </successContext.SuccessProvider>
      </guessedWordsContext.GuessedWordsProvider>
    </languageContext.Provider>
  );
};

test('Input renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { secretWord: 'party' };
  checkProps(Input, expectedProps);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup({});
  });
  test('state updates with value of input box upon change', () => {
    const component = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' }, preventDefault() {} };
    component.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('clear currentGuess after submit', () => {
    const component = findByTestAttr(wrapper, 'input-form');

    const mockEvent = { preventDefault() {} };
    component.simulate('submit', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

describe('language picker', () => {
  test('correctly renders submit string in english ', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'submit-button');
    expect(component.text()).toBe('Submit');
  });
  test('correctly renders submit string in emoji ', () => {
    const wrapper = setup({ language: 'emoji' });
    const component = findByTestAttr(wrapper, 'submit-button');
    expect(component.text()).toBe('🚀');
  });
});

test('input component does not show when success is true', () => {
  const wrapper = setup({ secretWord: 'party', success: true });
  expect(wrapper.isEmptyRender()).toBe(true);
});
