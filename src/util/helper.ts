export const isAllEnglishAlphabet = (str: string) => {
  // Regular expression to match only English alphabets (both lowercase and uppercase)
  const regex = /^[A-Za-z]+$/;

  // Test the string against the regex
  return regex.test(str);
};
