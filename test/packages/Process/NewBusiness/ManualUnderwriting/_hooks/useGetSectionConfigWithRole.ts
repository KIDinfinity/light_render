import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetRoleDisplayConfigCode from 'basic/components/Elements/hooks/useGetRoleDisplayConfigCode';

import getApplicableByRoleList from 'process/NewBusiness/ManualUnderwriting/_utils/getApplicableByRoleList';
import getApplicableByDisableCondidtions from 'process/NewBusiness/ManualUnderwriting/_utils/getApplicableByDisableCondidtions';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCustomerType from './useGetCustomerType';

export default ({ section, localConfig, clientId, condition = 'mw' }: any) => {
  const path = {
    mw: {
      customerRole: `entities.clientMap.${clientId}.personalInfo.customerRole`,
      customerType: `entities.clientMap.${clientId}.personalInfo.customerType`,
    },
    proposal: {
      customerRole: `modalData.entities.clientMap.${clientId}.personalInfo.customerRole`,
      customerType: `modalData.entities.clientMap.${clientId}.personalInfo.customerType`,
    },
  };
  const customerType = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    useGetCustomerType({ customerType: lodash.get(modelnamepsace, path[condition].customerType) })
  );
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, path[condition].customerRole),
    shallowEqual
  );
  const roleDisplayConfigCode = useGetRoleDisplayConfigCode();

  // get config of role/page/section
  const atomConfig = useSelector((state: any) => {
    return lodash.get(state, `atomConfig.groups.${roleDisplayConfigCode}`, []);
  }, shallowEqual);
  const disableFieldsConditions = useSelector((state: any) => {
    return lodash.get(state, `atomConfig.groups.${roleDisplayConfigCode}_disable_condition`, []);
  }, shallowEqual);
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  return useMemo(
    () =>
      lodash
        .chain(config)
        .filter((item) => {
          return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible')) && item.field;
        })
        .map((item: any) => {
          let configItem = getApplicableByRoleList({
            customerType,
            atomConfig,
            roleList: formUtils.queryValue(customerRole),
            fieldConfig: item,
          });
          configItem = getApplicableByDisableCondidtions({
            fieldConfig: configItem,
            condition,
            disableFieldsConditions,
          });
          return configItem;
        })
        .filter((item) => {
          return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible'));
        })
        .value(),
    [customerType, customerRole, atomConfig, config, disableFieldsConditions]
  );
};
