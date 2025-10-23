import getTextWidth from './getTextWidth';
import { xFontSize } from '../Config/defaultAxis';

export default ({ value }: any) => {
  return getTextWidth({
    value,
    maxTextWidth: 30,
    fontSize: xFontSize,
  });
};
