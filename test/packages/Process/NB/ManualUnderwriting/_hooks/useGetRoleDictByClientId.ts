import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useGetDefaultAdultAge from 'process/NB/ManualUnderwriting/_hooks/useGetDefaultAdultAge';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default ({ id, isSubCard, customerRole }: any) => {
  const list = useGetClientDetailList();
  const defaultAdultAge = useGetDefaultAdultAge();
  const dicts = useSelector((state: any) => state.manualUnderwriting?.roleDicts, shallowEqual);

  const hasJuvenileBeneficiary = lodash.some(
    list,
    (client: any) =>
      lodash.isNumber(client?.customerAge) &&
      client?.customerAge < defaultAdultAge &&
      lodash.some(client?.roleList, (role) => role.customerRole === CustomerRole.Beneficiary)
  );

  return useMemo(() => {
    const roleSet = new Set();
    const hasHealthFamilySharingMember = customerRole.includes(
      CustomerRole.HealthFamilySharingMember
    );
    let filteredDict;
    if (!isSubCard) {
      filteredDict = lodash
        .chain(dicts)
        .filter(
          (dict) =>
            dict?.dictCode !== CustomerRole.AuthorisedSignatory &&
            (hasHealthFamilySharingMember ||
              dict?.dictCode !== CustomerRole.HealthFamilySharingMember) &&
            (hasJuvenileBeneficiary || dict?.dictCode !== CustomerRole.LegalRepresentative)
        )
        .value();
    } else {
      filteredDict = lodash
        .chain(dicts)
        .filter((dict) => dict?.dictCode === CustomerRole.AuthorisedSignatory)
        .value();
    }
    const otherClients = lodash.filter(
      list,
      (client: any) => client.id !== id && client.deleted !== 1
    );
    lodash
      .chain(otherClients)
      .map((client: any) => {
        return lodash.forEach(client.roleList, (roleItem) => {
          roleSet.add(roleItem.customerRole);
        });
      })
      .value();
    return lodash.map(filteredDict, (item: any) => {
      if (item.dictCode === CustomerRole.LegalRepresentative) {
        if (
          customerRole.includes(CustomerRole.PolicyOwner) &&
          customerRole.includes(CustomerRole.Insured)
        ) {
          return {
            ...item,
            disabled: true,
          };
        }

        return item;
      } else if (
        roleSet.has(item.dictCode) &&
        ![CustomerRole.Insured, CustomerRole.Beneficiary, CustomerRole.CoBorrower].includes(
          item.dictCode
        )
      ) {
        return {
          ...item,
          disabled: true,
        };
      }

      return item;
    });
  }, [isSubCard, dicts, list, id, hasJuvenileBeneficiary]);
};
