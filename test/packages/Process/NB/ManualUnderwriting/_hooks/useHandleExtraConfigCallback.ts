import { useCallback } from 'react';
import lodash from 'lodash';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetFieldsCustomerTypeConfig from 'basic/hooks/useGetFieldsCustomerTypeConfig';
import getApplicableByRoleList from 'process/NB/ManualUnderwriting/utils/getApplicableByRoleList';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import changeSpanForChildCard from 'process/NB/ManualUnderwriting/utils/changeSpanForChildCard';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import useGetRoleDisplayConfigCode from 'basic/components/Elements/hooks/useGetRoleDisplayConfigCode';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

export default ({ id, isSubCard }: any) => {
  const list = useGetClientDetailList();
  const roleDisplayConfigCode = useGetRoleDisplayConfigCode();
  const atomConfig = useGetFieldsCustomerTypeConfig({
    atomGroupCode: roleDisplayConfigCode,
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const current = lodash.find(list, (i: any) => i.id === id);
  const roleList = current?.roleList;
  const customerType = useGetCustomerType(current);
  return useCallback(
    ({ config }) => {
      const result = lodash.map(config, (item) => {
        let configItem = getApplicableByRoleList({
          fieldConfig: item,
          customerType,
          roleList,
          atomConfig,
        });
        configItem = getApplicableByDisableCondidtions({
          fieldConfig: configItem,
          disableFieldsConditions,
          condition: 'proposal',
        });
        if (isSubCard) {
          configItem = changeSpanForChildCard({
            fieldConfig: configItem,
          });
        }
        return configItem;
      });
      return result;
    },
    [roleList, customerType, atomConfig, disableFieldsConditions, isSubCard]
  );
};
