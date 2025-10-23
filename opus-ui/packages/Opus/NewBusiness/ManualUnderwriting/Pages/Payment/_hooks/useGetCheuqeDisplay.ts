import { useMemo } from 'react';
import { useSelector } from 'dva';

import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import PayType from 'opus/NewBusiness/Enum/PayType';

export default ({ showOnly }: any) => {
  const defaultPayType =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData?.payType
    ) || '';
  const modalPayType =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.modalData?.processData?.planInfoData?.payType
    ) || '';

  const payType = showOnly ? defaultPayType : modalPayType;

  return useMemo(() => {
    return (
      tenant.region() === Region.MY &&
      (payType === PayType.Cheque || payType === PayType.DirectTransfer)
    );
  }, [payType]);
};
