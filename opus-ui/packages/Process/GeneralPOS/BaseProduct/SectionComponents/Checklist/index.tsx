import React, { useEffect } from 'react';
import { FormAntCard } from 'basic/components/Form';
import Item from './Item';
import { SectionTitle } from './Section';
import styles from './index.less';
import { NAMESPACE } from '../../activity.config';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

const Checklist = ({ doubleTransaction, transactionId, remark }) => {
  const dispatch = useDispatch();
  const mainPolicyId = useSelector(
    (state) => state.GeneralPOSController?.processData?.mainPolicyId
  );
  const sourceSystem = useSelector(
    (state) => state.GeneralPOSController?.processData?.sourceSystem
  );
  const policyInfoList = useSelector(
    (state) => state.GeneralPOSController?.processData?.policyInfo?.policyInfoList
  );
  const info =
    lodash.find(
      policyInfoList,
      (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
    ) || {};
  const newTrusteeIndicator = info?.trusteeIndicator === 'Y' ? 'Y' : 'N';
  const newRemark =
    tenant.region() === Region.MY && newTrusteeIndicator === 'N'
      ? lodash.filter(remark, (item) => item !== 'CL_TrusteeConsent')
      : remark;
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/checklistInit`,
      payload: {
        doubleTransaction,
        transactionId,
        remark: newRemark,
      },
    });
  }, [remark, newTrusteeIndicator]);
  return (
    <FormAntCard title={<SectionTitle />} className={styles.checklistBox}>
      <Item
        transactionId={transactionId}
        doubleTransaction={doubleTransaction}
        remark={newRemark}
      />
    </FormAntCard>
  );
};

export default Checklist;
