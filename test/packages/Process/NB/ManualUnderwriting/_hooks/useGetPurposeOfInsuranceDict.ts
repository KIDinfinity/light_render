import lodash from 'lodash';
import { useMemo } from 'react';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useExistEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useExistEntityPolicyOwner';
import useGetInsuredRelationOfProposer from 'process/NB/ManualUnderwriting/_hooks/useGetInsuredRelationOfProposer';
import { RelationOfProposer } from 'process/NB/ManualUnderwriting/Enum/relationOfProposerMapEnum';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';

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
  const insuredRelationOfProposer = useGetInsuredRelationOfProposer();
  const list = useGetClientDetailList();
  const existEntityPolicyOwner = useExistEntityPolicyOwner();
  const isInsuredNotPolicyOwner = useMemo(() => {
    return lodash
      .chain(list)
      .find((client: any) => {
        const customerRole = lodash
          .chain(client)
          .get('roleList', [])
          .map((role: any) => role.customerRole)
          .value();
        return (
          customerRole.includes(CustomerRole.Insured) &&
          !customerRole.includes(CustomerRole.PolicyOwner)
        );
      })
      .value();
  }, [list]);
  return useMemo(() => {
    if (existEntityPolicyOwner && isInsuredNotPolicyOwner) {
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
  }, [existEntityPolicyOwner, insuredRelationOfProposer, isInsuredNotPolicyOwner]);
};
