import { useCallback, useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetClientNameConfig from 'process/NB/ManualUnderwriting/_hooks/useGetClientNameConfig';
import DefaultValueConfig from 'process/NB/Enum/DefaultValueConfig';
import DefaultNameType from 'process/NB/Enum/DefaultNameType';
import FullNameMerge from 'process/NB/Enum/FullNameMerge';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default ({ isDefault }: any) => {
  const cfgRegionalDefaultValueList = useGetClientNameConfig();
  const sectionConfig = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig: {},
  });

  const tileDropdownTypeCode = useMemo(() => {
    return lodash
      .chain(sectionConfig)
      .find((fieldItem: any) => fieldItem?.field === 'title')
      .get('field-props.x-dict.dictTypeCode')
      .value();
  }, [sectionConfig]);

  return useCallback(
    ({ clientInfo: originClientInfo }) => {
      const clientInfo = formUtils.formatFlattenValue(
        formUtils.cleanValidateData(originClientInfo)
      );
      const isCustomerIndividual = useGetIsCustomerIndividual(clientInfo);
      const defaultNameType = lodash
        .chain(cfgRegionalDefaultValueList)
        .find((item) => item.codeType === DefaultValueConfig.ClientName)
        .get('defaultValue')
        .value();

      const fullNameMergeConfig = lodash
        .chain(cfgRegionalDefaultValueList)
        .find((item) => item.codeType === DefaultValueConfig.FullNameMerge)
        .get('defaultValue')
        .value();
      const fields = (() => {
        const material = isCustomerIndividual ?  ['firstName', 'middleName', 'surname', 'extensionName']  : ['surname'];
        if (fullNameMergeConfig === FullNameMerge.MERGE_WITH_TITLE && isCustomerIndividual) {
          return ['title', ...material];
        }
        if (fullNameMergeConfig === FullNameMerge.NOT_MERGE_WITH_TITLE) {
          return material;
        }
        return material;
      })();

      const keys = (() => {
        if (
          (defaultNameType === DefaultNameType.LocalName && isDefault) ||
          (defaultNameType === DefaultNameType.EnglishName && !isDefault)
        ) {
          return fields;
        }
        if (
          (defaultNameType === DefaultNameType.EnglishName && isDefault) ||
          (defaultNameType === DefaultNameType.LocalName && !isDefault)
        ) {
          return lodash.map(fields, (field) => {
            if (field !== 'title') {
              return `customerEn${lodash.upperFirst(field)}`;
            }
            return field;
          });
        }
        return [];
      })();

      const isNameParamAllEmpty = lodash
        .chain(clientInfo)
        .pick(lodash.filter(keys, (key) => key !== 'title'))
        .values()
        .every((value) => !value)
        .value();
      if (isNameParamAllEmpty) {
        return '';
      }
      return lodash
        .chain(clientInfo)
        .pick(keys)
        .entries()
        .map(([k, v]: any) => {
          if (k === 'title') {
            return formatMessageApi({
              [tileDropdownTypeCode]: v,
            });
          }
          return v;
        })
        .filter((item) => !!item)
        .join(' ')
        .value();
    },
    [isDefault, cfgRegionalDefaultValueList, tileDropdownTypeCode]
  );
};
