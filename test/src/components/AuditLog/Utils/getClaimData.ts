import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';
import { RegPath } from './RegExps';

export default (claimData: any) => {
  const newClaimData = lodash.cloneDeep(claimData);
  const claimDataMap = FlattenJS.convert(claimData);
  const multipleKeys = lodash
    .chain(claimDataMap)
    .keys()
    .filter((key: string) => RegPath.test(key?.substr(key?.lastIndexOf('.') + 1)))
    .map((key: string) => key?.substr(0, key?.lastIndexOf('[')))
    .uniq()
    .value();

  if (multipleKeys?.length) {
    lodash.map(multipleKeys, (key) => {
      const multipleData = lodash.get(newClaimData, key);
      lodash.set(newClaimData, key, multipleData?.join(','));
    });
  }

  const flattenData = FlattenJS.convert(newClaimData);

  const deleteItemSet = new Set();
  lodash
    .chain(flattenData)
    .entries()
    .forEach(([key, value]) => {
      if (/\.deleted$/.test(key) && value === 1) {
        deleteItemSet.add(key.replace(/\.deleted/, ''));
      }
    })
    .forEach(([key]) => {
      if (
        lodash.some(Array.from(deleteItemSet), (deletePath: string) =>
          lodash.includes(key, deletePath)
        )
      ) {
        // flattenData.delete(key)
        delete flattenData[key];
      }
    })
    .value();
  return FlattenJS.undo(flattenData);
};
