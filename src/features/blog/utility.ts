export const readingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const minutes = Math.ceil(words.length / wordsPerMinute);

  return minutes;
};
