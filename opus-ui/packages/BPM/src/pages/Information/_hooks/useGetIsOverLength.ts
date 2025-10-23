import { useMemo } from 'react';
import lodash from 'lodash';

export default ({ content, maxLength }: any) => {
  const result = useMemo(() => {
    if (!lodash.isString(content)) {
      return false;
    }
    const reg = /<p|div>/g;
    const breakReg = /\n/;
    if (reg.test(content)) {
      const splitContent = content.split(reg).filter((item) => !!item);
      if (splitContent.length > 3) {
        return true;
      }
    } else if (breakReg.test(content)) {
      let count = 0;

      const splitBreakContent = content.split(breakReg);
      if (splitBreakContent.length > 3) {
        return true;
      }
      for (let i = 0; i < splitBreakContent.length; i++) {
        count += Math.ceil(splitBreakContent[i]?.length / 30);
      }
      if (count > 3) {
        return true;
      }
      return false;
    }
    if (content.length > maxLength) {
      return true;
    } else {
      return false;
    }
  }, [content, maxLength]);
  return result;
};
