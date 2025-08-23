import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import DefaultValueConfig from 'process/NewBusiness/Enum/DefaultValueConfig';
import DefaultNameType from 'process/NewBusiness/Enum/DefaultNameType';
import FullNameMerge from 'process/NewBusiness/Enum/FullNameMerge';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

export default ({ clientId, isDefault = true }: any) => {
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.cfgRegionalDefaultValueList
  );
  const personalInfo =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo,
      shallowEqual
    ) || {};
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );

  const sectionConfig = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig: {},
  });

  const useGetTitle = () => {
    const fullNameMergeConfig = lodash.find(cfgRegionalDefaultValueList, {
      codeType: DefaultValueConfig.FullNameMerge,
    })?.defaultValue;
    const isCustomerEntity = useGetIsCustomerEntity({ customerType });

    if (fullNameMergeConfig === FullNameMerge.MERGE_WITH_TITLE && !isCustomerEntity) {
      const titleDropdownTypeCode = lodash
        .chain(sectionConfig)
        .find((fieldItem: any) => fieldItem?.field === 'title')
        .get('field-props.x-dict.dictTypeCode')
        .value();
      return [formatMessageApi({ [titleDropdownTypeCode]: personalInfo?.title })];
    }
    return [];
  };
  const useGetNameList = () => {
    const DEFAULTLOCAL = ['firstName', 'middleName', 'surname', 'extensionName'];
    const DEFAULTENGLISH = [
      'customerEnFirstName',
      'customerEnFiddleName',
      'customerEnSurname',
      'customerEnExtensionName',
    ];
    const defaultNameType = lodash.find(cfgRegionalDefaultValueList, {
      codeType: DefaultValueConfig.ClientName,
    })?.defaultValue;

    const keyList = [];
    if (isDefault) {
      if (defaultNameType === DefaultNameType.LocalName) {
        keyList.push(...DEFAULTLOCAL);
      }
      if (defaultNameType === DefaultNameType.EnglishName) {
        keyList.push(...DEFAULTENGLISH);
      }
    } else {
      if (defaultNameType === DefaultNameType.LocalName) {
        keyList.push(...DEFAULTENGLISH);
      }
      if (defaultNameType === DefaultNameType.EnglishName) {
        keyList.push(...DEFAULTLOCAL);
      }
    }
    return lodash.chain(personalInfo).pick(keyList).values().compact().value();
  };
  const title = useGetTitle();
  const nameList = useGetNameList();

  return useMemo(() => {
    return lodash.size(nameList) > 0 ? title.concat(nameList).join(' ') : nameList.join(' ');
  }, [title, nameList]);
};
