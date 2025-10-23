import lodash from 'lodash';
import { RegArrays } from './RegExps';
import checkChangedField from './checkChangedField';
import { getUpdateData } from './getResultData';

export default ({
  diffMap,
  oldPath,
  newPath,
  changedFields,
  newClaimData,
  currentController,
}: any) => {
  return lodash
    .chain(diffMap)
    .keys()
    .filter((key: string) => {
      if (key.indexOf(newPath) === -1 && key.indexOf(oldPath) === -1) {
        return false;
      }
      const fieldNamePath = key.substr(key.lastIndexOf('.'));
      return !lodash.isEqual(
        diffMap[`${oldPath}${fieldNamePath}`],
        diffMap[`${newPath}${fieldNamePath}`]
      );
    })
    .map((key: string) => {
      const oldKey = key.replace(newPath, oldPath);
      const claimPath = oldKey?.substr(0, oldKey.lastIndexOf('.'))?.replace(RegArrays, '[$1]');
      const fieldName = key?.substr(key.lastIndexOf('.') + 1);
      const claimData = lodash.get(newClaimData, claimPath);
      const changedField = checkChangedField(claimData, changedFields, fieldName);
      return changedField
        ? getUpdateData({
            path: claimPath,
            fieldName,
            oldValue: diffMap[oldKey],
            newValue: diffMap[key],
            changedField,
            newClaimData,
            currentController,
          })
        : false;
    })
    .filter((item: any) => !!item)
    .value();
};
