import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DefaultValueConfig from 'process/NewBusiness/Enum/DefaultValueConfig';
import DefaultNameType from 'process/NewBusiness/Enum/DefaultNameType';
import FullNameMerge from 'process/NewBusiness/Enum/FullNameMerge';
import CustomerType from 'process/NewBusiness/Enum/CustomerType';
import useGetCustomerType from '../_hooks/useGetCustomerType';

const getTitle = ({
  personalInfo,
  customerType,
  cfgRegionalDefaultValueList,
  sectionConfig,
}: any) => {
  const fullNameMergeConfig = lodash.find(cfgRegionalDefaultValueList, {
    codeType: DefaultValueConfig.FullNameMerge,
  })?.defaultValue;

  if (
    fullNameMergeConfig === FullNameMerge.MERGE_WITH_TITLE &&
    customerType !== CustomerType.Entity
  ) {
    const titleDropdownTypeCode = lodash
      .chain(sectionConfig)
      .find((fieldItem: any) => fieldItem?.field === 'title')
      // @ts-ignore
      .get('field-props.x-dict.dictTypeCode')
      .value();
    return [formatMessageApi({ [titleDropdownTypeCode]: personalInfo?.title })];
  }
  return [];
};
const getNameList = ({ personalInfo, cfgRegionalDefaultValueList, isDefault }: any) => {
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
export default ({ clientInfo, cfgRegionalDefaultValueList, sectionConfig, isDefault }: any) => {
  const title = getTitle({
    personalInfo: clientInfo.personalInfo,
    customerType: useGetCustomerType(clientInfo),
    cfgRegionalDefaultValueList,
    sectionConfig,
  });
  const nameList = getNameList({
    personalInfo: clientInfo.personalInfo,
    cfgRegionalDefaultValueList,
    isDefault,
  });
  return lodash.size(nameList) > 0 ? title.concat(nameList).join(' ') : nameList.join(' ');
};
