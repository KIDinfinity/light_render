import { cloneDeep, isPlainObject } from 'lodash';

export default (postData: any = {}) => {
  if (!isPlainObject(postData)) return postData;
  const { newCase, originalCase } = postData;
  const tempOriginalCase = cloneDeep(originalCase);
  const tempNewCase = cloneDeep(newCase);

  return {
    ...postData,
    newCase: tempNewCase,
    originalCase: tempOriginalCase,
  };
};
