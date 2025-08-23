import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useMemo } from 'react';
import useGetDecisionColumns from 'decision/components/Benefit/_hooks/useGetDecisionColumns';
import getApplicableByDisableCondidtions from 'process/NewBusiness/ManualUnderwriting/_utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'decision/components/Benefit/Edit/_hooks/useGetFieldsFieldsDisableConditionConfig';
import { useGetHasFamilyGroupInd } from 'process/NewBusiness/ManualUnderwriting/_hooks';
import useHaveSaMultiplierInd from 'decision/components/Benefit/Edit/_hooks/useHaveSaMultiplierInd';

const filterFields = ['name', 'uwDecision', 'loadingPremium', 'instalmentPremiumWithTax'];

export default () => {
  const hasFamilyGroupInd = useGetHasFamilyGroupInd(false);
  const config = useGetDecisionColumns();
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config.map((item) => {
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'proposal',
    });
    return configItem;
  });
  const haveSaMultiplierInd = useHaveSaMultiplierInd();
  return useMemo(() => {
    let newFilterFields = filterFields;
    if (!hasFamilyGroupInd) {
      newFilterFields = [...newFilterFields, 'laSharingGroupNumber'];
    }
    if(!haveSaMultiplierInd) {
      newFilterFields = [...newFilterFields, 'sumAssuredMultiplier'];
    }
    const columnsSet = new Set();
    lodash.forEach(configByDisableCondition, (configItem: any) => {
      if (configItem && configItem?.['field-props']?.visible !== 'N') {
        if (!newFilterFields.includes(configItem?.field)) {
          columnsSet.add({
            fieldName: configItem?.field,
            id: configItem?.field,
            title: formatMessageApi({
              [configItem?.['field-props']?.label?.dictTypeCode]:
                configItem?.['field-props']?.label?.dictCode,
            }),
            span: lodash.get(configItem, 'field-props.x-layout.lg.span'),
            order: lodash.get(configItem, 'field-props.x-layout.lg.order'),
          });
        }
      }
    });
    return lodash.orderBy(Array.from(columnsSet), 'order');
  }, [configByDisableCondition, hasFamilyGroupInd]);
};
