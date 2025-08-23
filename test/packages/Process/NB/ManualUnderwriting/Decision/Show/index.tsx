import React, { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import AddExclusionModal from 'process/NB/ManualUnderwriting/Decision/AddExclusionModal';
import useGetDecisionData from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionData';
import useLoadExclusionList from 'process/NB/ManualUnderwriting/_hooks/useLoadExclusionList';
import useLoadAllResonConfigList from 'process/NB/ManualUnderwriting/_hooks/useLoadAllResonConfigList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Benefit from 'process/NB/ManualUnderwriting/Decision/Benefit/Show';
import PolicyLevelDecision from './PolicyLevelDecision';
import useGetNumberofunitsListByProductCode from 'process/NB/ManualUnderwriting/_hooks/useGetNumberofunitsListByProductCode';
import Header from './Header';
import styles from './index.less';

const Decision = () => {
  const dispatch = useDispatch();
  useLoadExclusionList();
  useGetNumberofunitsListByProductCode();
  const data = useGetDecisionData();
  useLoadAllResonConfigList();
  const { applicationNo, policyOrderCoerageList }: any = lodash.pick(data, ['applicationNo']);
  const isShowPopUpDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isShowPopUpDecision,
    shallowEqual
  );
  useEffect(() => {
    lodash.map(policyOrderCoerageList, (item: any) => {
      dispatch({
        type: `${NAMESPACE}/saveShowAddBtn`,
        payload: {
          value: formUtils.queryValue(item?.uwDecision),
          productCode: item?.coreCode,
        },
      });

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
    dispatch({
      type: `${NAMESPACE}/getDropdownList`,
    });
    dispatch({
      type: `${NAMESPACE}/searchBankCode`,
    });
    dispatch({
      type: `${NAMESPACE}/getAllFundConfigList`,
    });
  }, [applicationNo]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getExceptLoadingSetup`,
    });
  }, []);

  return (
    <div className={styles.wrap}>
      <Header />
      <PolicyLevelDecision />
      <div className={styles.table}>
        <div className={styles.content}>
          <div className={styles.benefit}>
            <Benefit />
          </div>
        </div>
      </div>
      {isShowPopUpDecision && <AddExclusionModal />}
    </div>
  );
};

Decision.displayName = 'decision';

export default Decision;
