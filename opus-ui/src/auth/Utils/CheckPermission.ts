import lodash from 'lodash';
import type { AuthProps } from '../Typings';

export default (
  category: string | string[],
  authList: AuthProps[],
  isBoolean: boolean = false
): any => {
  const isStrCategory = lodash.isString(category);
  const categoryList = isStrCategory ? [category] : lodash.isArray(category) ? category : [];
  const categoryArray = lodash.map(categoryList, (categoryStr) => {
    const target = lodash.find(authList, (item: AuthProps) => {
      if (isBoolean) {
        return item.categoryCode === categoryStr && item.result === true;
      }
      return item.categoryCode === categoryStr;
    });
    return isBoolean ? !!target : target;
  });
  return isStrCategory ? lodash.head(categoryArray) : categoryArray;
};
