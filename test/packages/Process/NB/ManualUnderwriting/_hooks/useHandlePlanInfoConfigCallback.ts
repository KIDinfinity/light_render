import { useCallback } from 'react';
import lodash from 'lodash';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import ProductType from 'process/NB/ManualUnderwriting/Enum/ProductType';
import { tenant, Region } from '@/components/Tenant';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { produce }  from 'immer';

export default () => {
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const coverageList = useGetCoverageList();
  const mainCoverageItem = lodash.find(
    coverageList,
    (coverageItem) => coverageItem?.isMain === 'Y'
  );
  const isILPproduct = mainCoverageItem?.productType === ProductType.ILP;
  const isTHRegion = tenant.region() === Region.TH;
  const THFilterField = [
    'rpqScore',
    'rpqRiskLevel',
    'rpqExecuteDate',
    'privateFundFlag',
    'rebalancingType',
  ];

  return useCallback(
    ({ config }) => {
      const result = lodash.map(config, (item) => {
        const configItem = getApplicableByDisableCondidtions({
          fieldConfig: item,
          disableFieldsConditions,
          condition: 'proposal',
        });
        if (isTHRegion && !isILPproduct && THFilterField.includes(configItem.field)) {
          return produce(configItem, (draft: any) => {
            lodash.set(draft, 'field-props.visible', 'N');
          });
        } else {
          return configItem;
        }
      });
      return result;
    },
    [disableFieldsConditions, coverageList]
  );
};
