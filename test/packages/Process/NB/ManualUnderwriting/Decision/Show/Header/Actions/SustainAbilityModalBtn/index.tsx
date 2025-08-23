import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import styles from './index.less';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

const SustainabilityModalBtn = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_SustainabilityOptions';
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: `${NAMESPACE}/setSustainabilityCaseModalVisible`,
      payload: {
        setSustainabilityCaseModalVisible: true,
      },
    });
    dispatch({
      type: `${NAMESPACE}/stashConfirmedSustainabilityCheckingSelected`,
    });
  };

  const sustainabilityModalBtnVisible = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.sustainabilityModalBtnVisible,
    shallowEqual
  );

  return (
    <AuthorizedAtom
      currentAuthority={currentAuthority}
      key="RS_NB_Button_ManualUW_SustainabilityOptions"
    >
      <div className={styles.btnDiv}>
        <Button onClick={handleClick} disabled={!sustainabilityModalBtnVisible}>
          {'Sustainability Options'}
        </Button>
      </div>
    </AuthorizedAtom>
  );
};

SustainabilityModalBtn.displayName = 'sustainabilityModalBtn';

export default SustainabilityModalBtn;
