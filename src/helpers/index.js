export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set(secretWord.split(''));
  const guessedLetterSet = new Set(guessedWord.split(''));
  // return [...secretLetterSet].reduce(
  //   (count, letter) => (guessedLetterSet.has(letter) ? count + 1 : count),
  //   0
  // );
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter)).length;
}
