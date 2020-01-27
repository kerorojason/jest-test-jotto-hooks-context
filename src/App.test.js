import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../test/testutils';
import App from './App';
import { exportAllDeclaration } from '@babel/types';

const setup = (props = {}) => {
  return shallow(<App />);
};

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
