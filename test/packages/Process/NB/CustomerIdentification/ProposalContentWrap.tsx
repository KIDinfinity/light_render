import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import Content from './Content';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getPageAtomConfig`,
      payload: {
        activityCode: 'BP_NB_ACT002',
        caseCategory: 'BP_NB_CTG001',
      },
    });
    if (!lodash.isEmpty(businessData)) {
      dispatch({
        type: `${NAMESPACE}/saveClaimProcessData`,
        payload: {
          claimProcessData: { ...businessData },
        },
      });
      return;
    }
  }, [businessData]);
  return <Content />;
};
