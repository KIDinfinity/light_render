import { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import getClientRoleName from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/getClientRoleName';

import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import { TransferPaymentStatus } from 'process/NewBusiness/ManualUnderwriting/_enum';

export default () => {
  const { policyId = '', premiumTransferList = [] } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData) || {};
  const clientMap =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.entities?.clientMap) ||
    {};
  const paymentAmountData =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.paymentAmountData) || {};

  const clientId =
    lodash
      .chain(lodash.values(clientMap))
      .find(({ roleList = [] }: any) =>
        lodash.some(roleList, ({ customerRole }: any) => customerRole === CustomerRole.Payor)
      )
      .get('id')
      .value() || '';

  const policyPayor = getClientRoleName({ clientId });

  const transferedAmount = lodash
    .chain(premiumTransferList)
    .filter(({ status }: any) => status === TransferPaymentStatus.Success)
    .map(({ amount }: any) => amount || 0)
    .reduce((a: number, b: number) => {
      return a + b;
    })
    .value();

  return useMemo(() => {
    return { policyId, policyPayor, transferedAmount, ...paymentAmountData };
  }, [policyId, policyPayor, transferedAmount, paymentAmountData]);
};
