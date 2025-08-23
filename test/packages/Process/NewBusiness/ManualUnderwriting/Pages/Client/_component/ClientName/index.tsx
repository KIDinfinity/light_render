import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { formUtils } from 'basic/components/Form';
import ShortcutOf360 from 'basic/components/ShortcutOf360';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import DefaultValueConfig from 'process/NewBusiness/Enum/DefaultValueConfig';
import DefaultNameType from 'process/NewBusiness/Enum/DefaultNameType';
import FullNameMerge from 'process/NewBusiness/Enum/FullNameMerge';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

const useGetIsEntity = ({ readOnly, clientId }: any) => {
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );

  const customerTypeEdit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData?.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );
  return useGetIsCustomerEntity({
    customerType: readOnly ? customerType : customerTypeEdit,
  });
};

const useGetTitle = ({ personalInfo, clientId, cfgRegionalDefaultValueList, readOnly }: any) => {
  const sectionConfig = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig: {},
  });

  const fullNameMergeConfig = lodash.find(cfgRegionalDefaultValueList, {
    codeType: DefaultValueConfig.FullNameMerge,
  })?.defaultValue;

  const isCustomerEntity = useGetIsEntity({ readOnly, clientId });

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

const useGetNameList = ({
  personalInfo,
  cfgRegionalDefaultValueList,
  isDefault,
  clientId,
  readOnly,
}: any) => {
  const DEFAULTLOCAL = ['firstName', 'middleName', 'surname', 'extensionName'];
  const DEFAULTENGLISH = [
    'customerEnFirstName',
    'customerEnMiddleName',
    'customerEnSurname',
    'customerEnExtensionName',
  ];
  const defaultNameType = lodash.find(cfgRegionalDefaultValueList, {
    codeType: DefaultValueConfig.ClientName,
  })?.defaultValue;

  let keyList = [];
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
  const isCustomerEntity = useGetIsEntity({ readOnly, clientId });

  if (isCustomerEntity) {
    keyList =
      lodash.filter(keyList, (key) => lodash.chain(key).toLower().includes('surname').value()) ||
      [];
  }

  return lodash.chain(personalInfo).pick(keyList).values().compact().value();
};

const useGetClientName = ({ clientId, isDefault = true, readOnly }: any) => {
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.cfgRegionalDefaultValueList
  );
  const personalInfo =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo,
      shallowEqual
    ) || {};
  const personalInfoEdit =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.modalData?.entities?.clientMap?.[clientId]?.personalInfo,
      shallowEqual
    ) || {};

  const personalInfoValue = formUtils.cleanValidateData(readOnly ? personalInfo : personalInfoEdit);
  const title = useGetTitle({
    personalInfo: personalInfoValue,
    clientId,
    cfgRegionalDefaultValueList,
    readOnly,
  });
  const nameList = useGetNameList({
    personalInfo: personalInfoValue,
    cfgRegionalDefaultValueList,
    isDefault,
    clientId,
    readOnly,
  });
  return lodash.size(nameList) > 0 ? title.concat(nameList).join(' ') : nameList.join(' ');
};

export default ({ clientId, readOnly = true }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );
  const customerRoleEdit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData?.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    shallowEqual
  );
  const name = useGetClientName({ clientId, readOnly });

  return (
    <ShortcutOf360
      activeClientId={clientId}
      activeCustomerType={formUtils.queryValue(readOnly ? customerRole : customerRoleEdit)}
    >
      {name}
    </ShortcutOf360>
  );
};
