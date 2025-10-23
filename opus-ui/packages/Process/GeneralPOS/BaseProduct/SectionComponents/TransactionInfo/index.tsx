import React, { useEffect } from 'react';
import DetailsMap from './DetailsMap';
import { formUtils } from 'basic/components/Form';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { LimitTypeEnum } from 'process/GeneralPOS/common/Enum';

const ServicingRequestInfo = ({
  transactionId,
  transactionTypeCode,
  notCft,
  isNotDataCapture,
  OMNEShow,
}) => {
  const dispatch = useDispatch();
  const transactionTypeCodeMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.transactionTypeCodeMap
  );
  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const policyInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo?.policyInfoList
  );
  const companyCode = lodash
    .chain(policyInfoList)
    .find((item) => item.policyId === mainPolicyId)
    .get('companyCode')
    .value();

  useEffect(() => {
    if (transactionTypeCode && transactionId && transactionTypeCodeMap) {
      dispatch({
        type: `${NAMESPACE}/transactionTypeCodeInit`,
        payload: {
          transactionTypeCode,
          transactionId,
        },
      });
    }
  }, [formUtils.queryValue(transactionTypeCode), transactionId, transactionTypeCodeMap]);

  useEffect(() => {
    if ([Region.MY, Region.PH].includes(tenant.region())) {
      dispatch({
        type: `${NAMESPACE}/getLimitDataByType`,
        payload: { companyCode, limitType: LimitTypeEnum.NumberOfFundAllocation },
      });
    }
  }, [companyCode]);

  if (notCft && isNotDataCapture) {
    return null;
  }

  return (
    <DetailsMap
      transactionTypeCode={formUtils.queryValue(transactionTypeCode)}
      transactionId={transactionId}
      isNotDataCapture={isNotDataCapture}
      notCft={notCft}
      OMNEShow={OMNEShow}
    />
  );
};

export default ServicingRequestInfo;
