import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testutils';
import App from './App';

// import { getSecretWord } from './actions/hookActions';
import hookAction from './actions/hookActions';

const mockGetSecretWord = jest.fn();
// let getSecretWord;
const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear();
  hookAction.getSecretWord = mockGetSecretWord;
  // getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn().mockReturnValue([{ secretWord, language: 'en' }, jest.fn()]);
  React.useReducer = mockUseReducer;

  // use mount because useEffect is not called on shallow
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(<App />);
};

test('App renders without error', () => {
  const wrapper = setup('party');
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on APp moint', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // wrapper.update() doesn;t trigger useEffect update
    // {issue forked from https://github.com/airbnb/enzyme/issues/2091}
    wrapper.setProps();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  });

  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });
  test('does not render spinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'component-spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(false);
  });
  test('render spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'component-spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});
