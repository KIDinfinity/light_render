import { useCallback } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import DefaultValueConfig from 'process/NB/Enum/DefaultValueConfig';
import FullNameMerge from 'process/NB/Enum/FullNameMerge';
import DefaultNameType from 'process/NB/Enum/DefaultNameType';

export default ({ isDefault }: any) => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData,
    shallowEqual
  );

  const defaultValue = lodash
    .chain(claimProcessData)
    .get('cfgRegionalDefaultValueList', [])
    .find((item: any) => item?.codeType === 'clientName')
    .get('defaultValue')
    .value();
  const fullNameMergeConfig = lodash
    .chain(claimProcessData)
    .get('cfgRegionalDefaultValueList', [])
    .find((item) => item.codeType === DefaultValueConfig.FullNameMerge)
    .get('defaultValue')
    .value();

  return useCallback(
    ({ clientInfo }) => {
      const englishFullName = formUtils.queryValue(clientInfo?.customerEnName);
      const localFullName = formUtils.queryValue(clientInfo?.name);
      const originName = (() => {
        if (
          (isDefault && defaultValue === DefaultNameType.EnglishName) ||
          (!isDefault && defaultValue === DefaultNameType.LocalName)
        ) {
          return englishFullName;
        }
        if (
          (isDefault && defaultValue === DefaultNameType.LocalName) ||
          (!isDefault && defaultValue === DefaultNameType.EnglishName)
        ) {
          return localFullName;
        }
      })();
      const title = formUtils?.queryValue(clientInfo?.title);

      const name = (() => {
        if (fullNameMergeConfig === FullNameMerge.MERGE_WITH_TITLE) {
          return lodash
            .chain([title, originName])
            .filter((item) => !!item)
            .join(' ')
            .value();
        }
        if (fullNameMergeConfig === FullNameMerge.NOT_MERGE_WITH_TITLE) {
          return originName;
        }
        return originName;
      })();
      return name;
    },
    [isDefault, defaultValue, fullNameMergeConfig]
  );
};
