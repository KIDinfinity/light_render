import * as FlattenJS from 'flattenjs';
import lodash, { compact, set } from 'lodash';

const getPathArrays = (key: string) =>
  String(key)
    ?.split('.')
    ?.reduce((arrs: string[], path: string) => {
      return [...arrs, compact([arrs?.[arrs?.length - 1], path]).join('.')];
    }, [])
    ?.filter((path: string) => path !== key);

export default (claimPayableList: any[]) => {
  const dataMap = FlattenJS.convert(claimPayableList);

  for (const [key, value] of Object.entries(dataMap)) {
    if (key.includes('registered') && !!value) {
      lodash.map(getPathArrays(key), (path: string) => {
        set(claimPayableList, `${path}.registered`, true);
      });
    }
  }

  return claimPayableList;
};
