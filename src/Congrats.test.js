import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';

const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false;

  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

test('renders without error', () => {
  const wrapper = setup({}); // empty Object for destructuring
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});

test("renders no text when 'success'  is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});

test("renders non-empty congrats message when 'success'  is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});

// test('does not throw warning with expected props', () => {
//   const expectedProps = { success: false };
//   checkProps(Congrats, expectedProps);
// });

describe('language picker', () => {
  test('correctly renders congrats string in english ', () => {
    // can't test default value by this pattern! (default already set in 'setup()')
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
  });
  test('correctly renders congrats string in emoji ', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe('🎯🎉');
  });
});
