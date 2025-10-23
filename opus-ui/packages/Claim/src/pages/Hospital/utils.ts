import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';

const numberPrecisionFn = (text: number) => {
  let textFormat = text;
  if (text === 0 || text) {
    textFormat = fnPrecisionFormat(fnPrecisionParser(text.toFixed(2)));
  }
  return textFormat;
};

export { numberPrecisionFn };
