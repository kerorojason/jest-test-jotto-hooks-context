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

describe('language string testing', () => {
  const mockWarn = jest.fn();
  let originalWarn;
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    // avoid console.wran in future test being swallowed
    console.warn = originalWarn;
  });

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test('returns correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test('returns english submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [notALanguage]');
  });

  test('returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
    expect(mockWarn).toHaveBeenCalledWith('Could not get string [submit] for [mermish]');
  });
});
