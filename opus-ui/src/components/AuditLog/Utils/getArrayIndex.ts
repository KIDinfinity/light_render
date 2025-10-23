import { RegNumber } from './RegExps';

export default (path: string) => {
  const idx = path?.match(RegNumber);
  if (!idx?.length) {
    return 0;
  }
  return Number?.(idx?.[idx.length - 2]);
};
