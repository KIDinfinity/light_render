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
    Dropdown_IND_Relationship_POEntity_EM: relationshipPOEntityEMDicts,
    Dropdown_IND_Relationship_POEntity_BP: relationshipPOEntityBPDicts,
    Dropdown_IND_Relationship_PIEntity: relationshipPIEntityDicts,
  } = getDrowDownList([
    'Dropdown_IND_Relationship_POEntity_EM',
    'Dropdown_IND_Relationship_POEntity_BP',
    'Dropdown_IND_Relationship_PIEntity',
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
        return relationshipPIEntityDicts;
      }
      if (insuredRelationOfProposer === RelationOfProposer.EmployeeKeyman) {
        return relationshipPOEntityEMDicts;
      }
      if (insuredRelationOfProposer === RelationOfProposer.BusinessPartner) {
        return relationshipPOEntityBPDicts;
      }
    }
  }, [existEntityPolicyOwner, insuredRelationOfProposer, isInsuredNotPolicyOwner]);
};
