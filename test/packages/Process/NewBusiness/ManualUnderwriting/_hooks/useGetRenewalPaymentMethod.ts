import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import { Region, tenant } from '@/components/Tenant';

export default () => {
  if (tenant.region() === Region.KH) return;
  const dispatch = useDispatch();
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelNameSpace }: any) => modelNameSpace?.processData?.coverageList,
    shallowEqual
  );

  const agentList = useSelector(
    ({ [NAMESPACE]: modelNameSpace }: any) => modelNameSpace?.processData?.agentList,
    shallowEqual
  );
  const planInfoData = useSelector(
    ({ [NAMESPACE]: modelNameSpace }: any) => modelNameSpace?.processData?.planInfoData,
    shallowEqual
  );
  const params = useMemo(() => {
    const { coreCode: productCode } =
      lodash.find(coverageList, (item: any) => item?.isMain === 'Y') || {};
    const { agentChannelCode: businessSource, bankNo: bankCode } =
      lodash.find(agentList, (item: any) => item?.agentType === 'P') || {};
    const acceptablePaymentMode =
      formUtils.queryValue(lodash.get(planInfoData, 'policyPayMode')) || null;
    const premiumType = formUtils.queryValue(lodash.get(planInfoData, 'premiumType')) || null;
    return {
      productCode,
      businessSource,
      bankCode,
      acceptablePaymentMode,
      premiumType,
    };
  }, [agentList, coverageList, planInfoData]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getRenewalPaymentMethod`,
      payload: {
        params,
      },
    });
  }, [dispatch, params]);
};
