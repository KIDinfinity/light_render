import { reduce } from 'lodash';
import { CanvasId } from '../Enum';
import { xFontSize } from '../Config/defaultAxis';

export default ({ value = '', maxTextWidth = 30, fontSize = xFontSize }: any) => {
  const canvas: any = document.getElementById(CanvasId);
  const context = canvas?.getContext('2d');

  if (!canvas || !context) {
    return value;
  }

  context.fontSize = fontSize;

  return reduce(
    String(value),
    (str: string, current: string) => {
      if (/\.\.\./.test(str)) {
        return str;
      }
      if (context?.measureText(`${str}${current}`)?.width > maxTextWidth) {
        return `${str}...`;
      }
      return `${str}${current}`;
    },
    ''
  );
};
