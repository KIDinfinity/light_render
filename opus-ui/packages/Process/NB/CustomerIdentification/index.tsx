import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import { NAMESPACE } from 'process/NB/CustomerIdentification/activity.config';
import Content from './Content';

const CustomerIdentification = ({ businessData, businessNo }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getClaim`,
      payload: {
        activityCode: 'BP_NB_ACT002',
        caseCategory: 'BP_NB_CTG001',
        businessNo,
        businessData,
      },
    });
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearClaim`,
      });
      dispatch({
        type: 'formCommonController/handleUnSubmited',
      });
    };
  }, [businessData]);

  return <Content />;
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(CustomerIdentification)));
