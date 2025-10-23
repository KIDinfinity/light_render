import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { NAMESPACE } from '../activity.config';

export default ({ policy }: any) => {
  const policyOwnerSelect = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.policyOwnerSelect,
    shallowEqual
  );
  const ASDeleteList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ASDeleteList,
    shallowEqual
  );
  const allExistingAuthorisedSignatoryList = (() => {
    return lodash
      .chain(policy)
      .get('clientInfoList')
      .find((client: any) => {
        const roleList = lodash
          .chain(client)
          .get('roleList')
          .map((role: any) => role?.customerRole)
          .value();
        return lodash.includes(roleList, CustomerRole.PolicyOwner);
      })
      .get('identificationList')
      .filter((identification: any) => identification?.type === 'A')
      .value();
  })();
  return useMemo(() => {
    const ASDeleteSet = new Set();
    lodash.forEach(ASDeleteList, (ASDelete) => {
      lodash.forEach(ASDelete, (item) => ASDeleteSet.add(item));
    });
    return lodash
      .chain(allExistingAuthorisedSignatoryList)
      .filter(
        (existingAuthorisedSignatory: any) =>
          existingAuthorisedSignatory?.parentId === policyOwnerSelect &&
          !ASDeleteSet.has(existingAuthorisedSignatory?.id)
      )
      .value();
  }, [allExistingAuthorisedSignatoryList, policyOwnerSelect, ASDeleteList]);
};
