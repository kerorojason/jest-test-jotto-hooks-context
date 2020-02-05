import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testutils';

import guessedWordsContext from './contexts/guessedWordsContext';
import successContext from './contexts/successContext';
import Input from './Input';
import GuessedWords from './GuessedWords';

function setup(secretWord = 'party', guessedWordsStrings = []) {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );
  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'input-form');

  guessedWordsStrings.map(word => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('submit');
  });

  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;
  describe('non-empy guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup('party', ['agile']);
    });

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('submit');
      });
      test('Input component contains no children', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.children().length).toBe(0);
      });
      test('GuessedWords table row count reflects update guesses', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });

    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('submit');
      });
      test('input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
      test('GuessedWords table row count reflects update guesses', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });

  describe('empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup('party', []);
    });
    test('GuessedWords table row count reflects update guesses in incorrect guess', () => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('submit');
      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
