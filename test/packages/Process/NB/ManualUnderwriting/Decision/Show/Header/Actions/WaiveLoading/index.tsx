import React, { useCallback, useState } from 'react';
import { Button } from 'antd';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';
import WaiveLoadingModal from './WaiveLoadingModal/index';
import styles from './index.less';

const WaiveLoading = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_WaiveLoading';
  const dispatch = useDispatch();
  const [recalValidate, setRecalValidate] = useState(false);

  const handleClick = useCallback(async () => {
    const pathname = window.location.pathname;
    if (/nb\/uw\/ews\//.test(pathname)) {
      dispatch({
        type: `${NAMESPACE}/setWaiveLoadingModalVisible`,
        payload: {
          waiveLoadingModalVisible: true,
        },
      });
    } else {
      setRecalValidate(true);
      const response = await dispatch({
        type: `${NAMESPACE}/premiumCalculation`,
        payload: {
          operationType: 'manual.uw.waive.recal.validate',
        },
      });
      setRecalValidate(false);

      if (lodash.get(response, 'success')) {
        dispatch({
          type: `${NAMESPACE}/setWaiveLoadingModalVisible`,
          payload: {
            waiveLoadingModalVisible: true,
          },
        });
      }
    }
  }, []);

  return (
    <>
      <AuthorizedAtom currentAuthority={currentAuthority} key="RS_NB_Button_ManualUW_WaiveLoading">
        <div className={styles.btnDiv}>
          <Button onClick={handleClick} disabled={!true} loading={recalValidate}>
            Waive Loading
          </Button>
        </div>
      </AuthorizedAtom>
      <WaiveLoadingModal />
    </>
  );
};

WaiveLoading.displayName = 'waiveLoading';

export default WaiveLoading;
