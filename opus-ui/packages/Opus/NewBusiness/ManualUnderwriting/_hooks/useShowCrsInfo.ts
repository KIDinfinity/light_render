import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { CustomerType } from 'opus/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification/Enum';
import CustomerRole from 'opus/NewBusiness/Enum/CustomerRole';
import useGetBasicProductSkipSnapshot from './useGetBasicProductSkipSnapshot';

const AllowRoles = [CustomerRole.Insured, CustomerRole.PolicyOwner];

export default (clientId: string, mode: 'edit' | 'show') => {
  const modelNamespacePrefix =
    mode == 'edit' ? `${NAMESPACE}.modalData.entities` : `${NAMESPACE}.entities`;

  const customerRole = useSelector(
    (state) =>
      lodash.get(state, `${modelNamespacePrefix}.clientMap.${clientId}.personalInfo.customerRole`),
    shallowEqual
  );
  const customerType = useSelector(
    (state) =>
      lodash.get(state, `${modelNamespacePrefix}.clientMap.${clientId}.personalInfo.customerType`),
    shallowEqual
  );

  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;
  const basicProduct = useGetBasicProductSkipSnapshot();

  return useMemo(() => {
    const roleList = formUtils.queryValue(customerRole);
    const isExistRole = !lodash.isEmpty(roleList);
    const isAllowSection = lodash.some(roleList, (role) => AllowRoles.includes(role));
    const isPersonal = formUtils.queryValue(customerType) === CustomerType.Personal;
    const crsIndShow = basicProduct?.productCenterFeature?.crsInd !== 'No';

    const show = isExistRole && isAllowSection && isPersonal && crsIndShow;

    return mode === 'show' ? show && expand : show;
  }, [customerRole, customerType, basicProduct, mode, expand]);
};
