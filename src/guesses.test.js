import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testutils';

import successContext from './contexts/successContext';
import Input from './Input';
import { exportAllDeclaration } from '@babel/types';

function setup(secretWord = 'party') {
  const wrapper = mount(
    <successContext.SuccessProvider>
      <Input secretWord={secretWord} />
    </successContext.SuccessProvider>
  );
  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'input-form');
  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitButton;
  beforeEach(() => {
    [wrapper, inputBox, submitButton] = setup('party');
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
  });
});
