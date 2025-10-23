import { getDrowDownList } from '@/utils/dictFormatMessage';
import useAutoLoadHierachySubDicts from 'basic/hooks/useAutoLoadHierachySubDicts';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { useEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';

interface IParams {
  parentType: string;
  parentCode: string;
  subType: string;
  onlyOnParentCodeChanged?: boolean; // 只有当parentCode变化时才触发callback
  callback?: (hierachyDicts: any[]) => void;
}

export default ({
  parentType,
  parentCode,
  subType,
  onlyOnParentCodeChanged = false,
  callback,
}: IParams) => {
  const preParentCode = useRef(parentCode);

  useAutoLoadHierachySubDicts({
    parentCode,
    parentFieldName: parentType,
  });

  const hierarchyDicts = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(dictionaryController, `hierarchyDicts.${parentType}.${parentCode}`),
    shallowEqual
  );

  useEffect(() => {
    if (
      !!parentCode &&
      (!onlyOnParentCodeChanged || preParentCode.current !== parentCode) &&
      lodash.isFunction(callback) &&
      !!hierarchyDicts
    ) {
      preParentCode.current = parentCode;
      callback(hierarchyDicts);
    }
  }, [parentCode, hierarchyDicts]);

  return hierarchyDicts
    ? lodash.filter(hierarchyDicts, (item: any) => item?.typeCode === subType)
    : getDrowDownList(subType);
};
