export const maskString = (input: string): string => {
  if (input.length < 4) {
    return input;
  }
  return '***' + input.slice(-4);
};
