import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';

import CustomerTypeEnum from 'process/NewBusiness/ManualUnderwriting/_enum/CustomerTypeEnum';
import { RelationOfProposer } from 'process/NewBusiness/ManualUnderwriting/_enum/relationOfProposerMapEnum';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const {
    Dropdown_POL_PurposeofInsurance_EntityFB: purposeofInsuranceEntityFBDicts,
    Dropdown_POL_PurposeofInsurance_EntityKI: purposeofInsuranceEntityKIDicts,
    Dropdown_POL_PurposeofInsurance_EntityPI: purposeofInsuranceEntityPIDicts,
  } = getDrowDownList([
    'Dropdown_POL_PurposeofInsurance_EntityFB',
    'Dropdown_POL_PurposeofInsurance_EntityKI',
    'Dropdown_POL_PurposeofInsurance_EntityPI',
  ]);

  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientInfoList
  );

  const roleList =
    lodash
      .chain(clientInfoList)
      .reduce((arr: any, { roleList }: any) => {
        return [...arr, ...roleList];
      }, [])
      .value() || [];

  const insuredRelationOfProposer = useMemo(() => {
    return (
      lodash
        .chain(roleList)
        .find(({ customerRole = '' }: any) => customerRole === 'relationOfProposer')
        .get('relationOfProposer')
        .value() || ''
    );
  }, [roleList]);

  const existEntityPolicyOwner = useMemo(() => {
    return (
      lodash
        .chain(roleList)

        .find(({ customerRole = '', customerType = '' }: any) => {
          return (
            formUtils.queryValue(customerType) === CustomerTypeEnum?.Company &&
            customerRole === CustomerRole.PolicyOwner &&
            tenant.region() === Region.PH
          );
        })
        .get('relationOfProposer')
        .value() || ''
    );
  }, [roleList]);
  return useMemo(() => {
    if (existEntityPolicyOwner) {
      if (insuredRelationOfProposer === RelationOfProposer.Employee) {
        return purposeofInsuranceEntityFBDicts;
      }
      if (insuredRelationOfProposer === RelationOfProposer.EmployeeKeyman) {
        return purposeofInsuranceEntityKIDicts;
      }
      if (insuredRelationOfProposer === RelationOfProposer.BusinessPartner) {
        return purposeofInsuranceEntityPIDicts;
      }
    }
  }, [existEntityPolicyOwner, insuredRelationOfProposer]);
};
