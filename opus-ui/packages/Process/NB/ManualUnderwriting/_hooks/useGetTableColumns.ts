import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useMemo } from 'react';
import useGetDecisionColumns from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionColumns';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';

export default () => {
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

  return useMemo(() => {
    const columnsSet = new Set();
    lodash.forEach(configByDisableCondition, (configItem: any) => {
      if (configItem && configItem?.['field-props']?.visible !== 'N') {
        if (
          ![
            'name',
            'uwDecision',
            // 'numberOfUnits',
            'loadingPremium',
            // 'annualPrem',
            'instalmentPremiumWithTax',
            // 'clientId',
          ].includes(configItem?.field)
        ) {
          columnsSet.add({
            fieldName: configItem?.field,
            id: configItem?.field,
            title: formatMessageApi({
              [configItem?.['field-props']?.label?.dictTypeCode]: configItem?.['field-props']?.label
                ?.dictCode,
            }),
            span: lodash.get(configItem, 'field-props.x-layout.lg.span'),
            order: lodash.get(configItem, 'field-props.x-layout.lg.order'),
          });
        }
      }
    });
    return lodash.orderBy(Array.from(columnsSet), 'order');
  }, [config]);
};
