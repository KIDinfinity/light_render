import React from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { some } from 'lodash';
import styles from './index.less';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

const SustainabilityModalBtn = () => {
  const currentAuthority = 'RS_NB_Button_ManualUW_SustainabilityOptions';
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: `${NAMESPACE}/initSustainability`,
    });
    dispatch({
      type: `${NAMESPACE}/setSustainabilityModalVisible`,
      payload: {
        visible: true,
      },
    });
  };

  const sustainabilityOptions = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.sustainabilityOptions,
    shallowEqual
  );
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const sustainabilityModalBtnVisible = some(
    sustainabilityOptions,
    (item: any) => item?.sustainable === 'Y'
  );

  return (
    editable &&
    sustainabilityModalBtnVisible && (
      <AuthorizedAtom
        currentAuthority={currentAuthority}
        key="RS_NB_Button_ManualUW_SustainabilityOptions"
      >
        <div className={styles.btnDiv}>
          <Button onClick={handleClick} disabled={!editable}>
            {'Sustainability Options'}
          </Button>
        </div>
      </AuthorizedAtom>
    )
  );
};

SustainabilityModalBtn.displayName = 'sustainabilityModalBtn';

export default SustainabilityModalBtn;
