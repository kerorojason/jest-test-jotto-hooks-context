import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testutils';
import Input from './Input';

const setup = (props = { secretWord: 'party' }) => {
  return shallow(<Input {...props} />);
};

test('Input renders without error', () => {
  const wrapper = setup();
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
    wrapper = setup();
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
