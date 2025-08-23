import React, { useEffect, useCallback } from 'react';
import { batch } from 'react-redux';

import Header from '../components/Header';
import PolicyLevelDecision from '../components/PolicyLevelDecision';
import styles from './index.less';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetNumberofunitsListByProductCode from '../_hooks/useGetNumberofunitsListByProductCode';
import useGetDecisionData from '../_hooks/useGetDecisionData';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Benefit from '../components/Benefit/index';

import MUErrorBoundary from 'process/NewBusiness/ManualUnderwriting/_components/MUErrorBoundary';
import useGetDeductibleOption from '../_hooks/useGetDeductibleOption';

export default () => {
  useGetNumberofunitsListByProductCode();
  useGetDeductibleOption();
  const data = useGetDecisionData();
  const dispatch = useDispatch();

  const policyOrderCoerageList: any = data?.policyOrderCoerageList;
  const memoizedDispatch = useCallback(
    (item: any) => {
      batch(() => {
        dispatch({
          type: `${NAMESPACE}/setClientNameList`,
          payload: {
            clientName: lodash.get(item, 'coverageInsuredList[0].clientName'),
          },
        });
        dispatch({
          type: `${NAMESPACE}/saveShowLoading`,
          payload: {
            value: formUtils.queryValue(item?.uwDecision),
            productCode: item?.coreCode,
          },
        });
      });
    },
    [NAMESPACE, formUtils]
  );

  useEffect(() => {
    lodash.map(policyOrderCoerageList, memoizedDispatch);
  }, [policyOrderCoerageList, memoizedDispatch]);

  return (
    <div className={styles.wrap}>
      <MUErrorBoundary panelName="Decision">
        <Header />
        <PolicyLevelDecision />
        <Benefit />
      </MUErrorBoundary>
    </div>
  );
};
