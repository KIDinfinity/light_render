import lodash from 'lodash';
import { RegArrayIndex, RegArrays } from './RegExps';

// 重复下标时，（先-后+）影响后面数组下标，
export default ({ diffMap, path }) => {
  const arrayIndex = Number?.(path.match(RegArrayIndex)?.[0]);
  const samePath = path?.substr(0, path.lastIndexOf('['));

  const idArray = lodash
    .chain(diffMap)
    .keys()
    .filter((key: string) => {
      const keyPath = key.replace(RegArrays, '[$1]');
      const lastName = key.substr(key.lastIndexOf('.') + 1);
      const keyIndex = Number?.(keyPath.match(RegArrayIndex)?.[0]);
      return lastName === 'id' && keyPath.indexOf(samePath) !== -1 && keyIndex < arrayIndex;
    })
    .map((key: string) => ({
      key,
      value: diffMap[key],
    }))
    .value();

  const uniqArray = lodash.uniqBy(idArray, 'value');
  const repeatCount = idArray?.length - uniqArray?.length;

  const newIndex = arrayIndex - repeatCount;

  return path.replace(RegArrayIndex, newIndex);
};
