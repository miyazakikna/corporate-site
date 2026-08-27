type ContactSpamInput = {
  companyName?: string;
  personName: string;
  message: string;
};

const GENERATED_LETTERS_PATTERN = /^[A-Za-z]{12,100}$/;
const LLC_SUFFIX_PATTERN = /(?:^|\s)LLC\.?$/i;

export const looksLikeGeneratedLetters = (value: string): boolean => {
  const text = value.normalize('NFKC').trim();

  if (!GENERATED_LETTERS_PATTERN.test(text)) {
    return false;
  }

  if (!/[A-Z]/.test(text) || !/[a-z]/.test(text)) {
    return false;
  }

  let caseSwitches = 0;

  for (let index = 1; index < text.length; index += 1) {
    const previousIsUppercase = /[A-Z]/.test(text[index - 1]);
    const currentIsUppercase = /[A-Z]/.test(text[index]);

    if (previousIsUppercase !== currentIsUppercase) {
      caseSwitches += 1;
    }
  }

  return caseSwitches >= 3;
};

export const isLikelyContactSpam = ({
  companyName,
  personName,
  message,
}: ContactSpamInput): boolean => {
  const normalizedCompanyName = (companyName ?? '').normalize('NFKC').trim();

  return (
    LLC_SUFFIX_PATTERN.test(normalizedCompanyName) &&
    looksLikeGeneratedLetters(personName) &&
    looksLikeGeneratedLetters(message)
  );
};
