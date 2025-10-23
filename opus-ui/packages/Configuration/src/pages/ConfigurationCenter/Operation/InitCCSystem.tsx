import React from 'react';
import { Button } from 'antd';
import { useSelector,useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { showSuccess, showErrors } from '../Utils/Common';

function InitCCSystem() {
  const dispatch: Dispatch = useDispatch();
  const isInit: boolean = useSelector((state: any) => state.configurationMenu.isInit);
  const initLoading: boolean = useSelector((state: any) => state.loading.effects['configurationCenter/initCCSystem']);

  const initConfiguration = async () => {
    const response: any = await dispatch({
      type: 'configurationCenter/initCCSystem',
    });
    if (response && response.success) {
      showSuccess(
        formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.message.initCCSystem.success',
        })
      );
    } else {
      showErrors(response.promptMessages || []);
    }
  };

  return (
    <>
      {!isInit && (
        <div className={styles.initBtn}>
          <Button type="primary" onClick={initConfiguration} loading={initLoading}>
            {formatMessageApi({
              Label_BPM_Button: 'configurationcenter.button.initCCSystem',
            })}
          </Button>
        </div>
      )}
    </>
  );

}
export default InitCCSystem;
