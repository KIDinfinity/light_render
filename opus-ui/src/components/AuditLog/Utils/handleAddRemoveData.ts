import lodash from 'lodash';
import { RegAdded, RegArrays, RegNew, RegOld, RegRemove } from './RegExps';

interface IParams {
  diffMap: any;
}

interface IHandleRemoveParams {
  idKey: string;
  diffMap: any;
}

interface IHandleAddParams {
  idKey: string;
  diffMap: any;
  maxIndex: number;
}

const RegMatchClientAdded = (index: string) =>
  RegExp(`clientInfoList\\[${index}\\[1\\]\\](.*).__added`);
const RegMatchClientDeleted = (index: string) =>
  RegExp(`clientInfoList\\[${index}\\[1\\]\\](.*).__deleted`);
const RegMatchClientNew = (index1: string, index2: string, field: string) =>
  RegExp(`clientInfoList\\[${index1}\\[${index2}\\]\\]\\.(${field})\\.__new`);

const RegMatchClientOld = (index1: string, index2: string, field: string) =>
  RegExp(`clientInfoList\\[${index1}\\[${index2}\\]\\]\\.(${field})\\.__old`);

const RegMatchClientInfoListIndex = (index1: string, index2: string) =>
  RegExp(`clientInfoList\\[(${index1})\\[${index2}]\\]`);

const handleClientRemoveData = ({ diffMap, idKey }: IHandleRemoveParams) => {
  const newDiffMap = lodash.cloneDeep(diffMap);
  const clientIndex = RegMatchClientInfoListIndex('\\d+?', '1').exec(idKey)?.[1];
  if (lodash.isNil(clientIndex)) {
    return newDiffMap;
  }
  const actionKey = `clientInfoList[${clientIndex}[0]]`;
  newDiffMap[actionKey] = '-';
  const newDiffEntries = lodash.entries(newDiffMap);
  lodash.forEach(newDiffEntries, ([key, value]) => {
    if (RegMatchClientDeleted(clientIndex).test(key)) {
      newDiffMap[key.replace(RegRemove, '')] = value;
      delete newDiffMap[key];
    }
    if (RegMatchClientOld(clientIndex, '1', '.*').test(key)) {
      newDiffMap[key.replace(RegOld, '')] = value;
      delete newDiffMap[key];
    }
  });

  return newDiffMap;
};

const handleClientAddData = ({ diffMap, idKey, maxIndex }: IHandleAddParams) => {
  const newDiffMap = lodash.cloneDeep(diffMap);
  const clientIndex = RegMatchClientInfoListIndex('\\d+?', '1').exec(idKey)?.[1];
  if (lodash.isNil(clientIndex)) {
    return newDiffMap;
  }
  const actionKey = `clientInfoList[${maxIndex + 1}[0]]`;
  newDiffMap[actionKey] = '+';
  const newDiffEntries = lodash.entries(newDiffMap);
  lodash.forEach(newDiffEntries, ([key, value]) => {
    if (RegMatchClientAdded(clientIndex).test(key)) {
      const addedKey = key.replace(RegAdded, '').replace(RegArrays, `[${maxIndex + 1}[$2]]`);
      newDiffMap[addedKey] = value;
      delete newDiffMap[key];
    }
    if (RegMatchClientNew(clientIndex, '1', '.*').test(key)) {
      const newKey = key.replace(RegNew, '').replace(RegArrays, `[${maxIndex + 1}[$2]]`);
      newDiffMap[newKey] = value;
      delete newDiffMap[key];
    }
  });
  return newDiffMap;
};

export default ({ diffMap }: IParams) => {
  if (lodash.isEmpty(diffMap)) {
    return diffMap;
  }
  let newDiffMap = lodash.cloneDeep(diffMap);
  const diffKeys = lodash.keys(newDiffMap);
  const maxIndexKey = lodash.find(lodash.reverse(diffKeys), (k) =>
    RegMatchClientInfoListIndex('\\d+?', '\\d+').test(k)
  );
  let maxIndex = Number(
    RegMatchClientInfoListIndex('\\d+?', '\\d+').exec(maxIndexKey ?? '')?.[1] ?? '0'
  );
  lodash.forEach(diffKeys, (key: string) => {
    if (RegMatchClientOld('\\d+', '\\d+', 'id').test(key)) {
      newDiffMap = handleClientRemoveData({ diffMap: newDiffMap, idKey: key });
    } else if (RegMatchClientNew('\\d+', '\\d+', 'id').test(key)) {
      newDiffMap = handleClientAddData({ diffMap: newDiffMap, maxIndex, idKey: key });
      maxIndex++;
    }
  });
  return newDiffMap;
};
