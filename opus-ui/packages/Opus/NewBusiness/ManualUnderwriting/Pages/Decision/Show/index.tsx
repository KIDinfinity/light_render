import { formUtils } from 'basic/components/Form';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import React, { useCallback, useEffect } from 'react';
import { batch } from 'react-redux';
import Benefit from '../components/Benefit/index';
import Header from '../components/Header';
import MIB from '../components/MIB';
import useGetDecisionData from '../_hooks/useGetDecisionData';
import useGetNumberofunitsListByProductCode from '../_hooks/useGetNumberofunitsListByProductCode';
import styles from './index.less';

export default () => {
  useGetNumberofunitsListByProductCode();

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
      <Header />
      <Benefit />
      <div className={styles.mibContainer}>
        <MIB />
      </div>
    </div>
  );
};
