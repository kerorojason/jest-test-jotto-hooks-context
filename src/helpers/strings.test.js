import stringmodule from './strings';
import { exportAllDeclaration } from '@babel/types';
const { getStringByLanguage } = stringmodule;

const strings = {
  en: {
    submit: 'submit'
  },
  emoji: {
    submit: '🚀'
  },
  mermish: {}
};

test('returns correct submit string for english', () => {
  const string = getStringByLanguage('en', 'submit', strings);
  expect(string).toBe('submit');
});

test('returns correct submit string for emoji', () => {
  const string = getStringByLanguage('emoji', 'submit', strings);
  expect(string).toBe('🚀');
});

test('returns english submit string when language does not exist', () => {
  const string = getStringByLanguage('noALanguage', 'submit', strings);
  expect(string).toBe('submit');
});

test('returns english submit string when submit key does not exist for language', () => {
  const string = getStringByLanguage('mermish', 'submit', strings);
  expect(string).toBe('submit');
});
