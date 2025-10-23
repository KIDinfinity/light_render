import React from 'react';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { Alert } from 'antd';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';
import {
  formatMessageApi,
  formatMessageApiTypeCodeLabel_CLM_Opus as t,
} from '@/utils/dictFormatMessage';
import styles from './index.less';

import Confirm from 'opus/Components/Modals/Confirm';

const ConfirmationModal = () => {
  const dispatch = useDispatch();

  const { visible, errorMsgMap } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      visible: modelnamespace?.confirmationModal?.visible,
      errorMsgMap: modelnamespace?.batchCreateCaseSubmit?.errorMsgMap,
    }),
    shallowEqual
  );

  const handleCancle = () => {
    dispatch({
      type: `${NAMESPACE}/initUploadDocumentsModalUploadFiles`,
    });
    dispatch({
      type: `${NAMESPACE}/confirmationModalVisible`,
    });
    dispatch({
      type: `${NAMESPACE}/uploadDocumentsVisible`,
    });
  };

  const handleConfirm = async () => {
    const response = (await dispatch({
      type: `${NAMESPACE}/getBatchCreateCaseSubmit`,
      payload: {
        keepErrorHandle: true,
      },
    })) as any;

    if (response.success) {
      dispatch({
        type: `${NAMESPACE}/confirmationModalVisible`,
      });

      dispatch({
        type: `${NAMESPACE}/sucessModalVisible`,
      });
    }
  };

  const fieldsMessage = (msgMap: object, startsWith: string) => {
    const rule = ['invalid', 'null'];
    const after = lodash.includes(rule, startsWith) ? `${t('row')} #` : '';

    return lodash
      .chain(msgMap)
      .reduce((map: object, item: number[], key: string): object => {
        return lodash.size(item) && lodash.startsWith(key, startsWith)
          ? { ...map, [key]: item }
          : map;
      }, {})
      .map((item: number[], key) => {
        return (
          <>
            {`${t(lodash.camelCase(key))}: ${after} ${item.toString()}`}
            <br />
          </>
        );
      })
      .value();
  };

  const nullFieldsMessage = fieldsMessage(errorMsgMap, 'null');
  const invalidFieldsMessage = fieldsMessage(errorMsgMap, 'invalid');

  return (
    <Confirm
      show={visible}
      brightBorderCancel={true}
      handleCancle={handleCancle}
      handleConfirm={handleConfirm}
    >
      <div className={styles.confirmationModal}>
        <div>{formatMessageApi({ Label_COM_Message: 'MSG_001211' })}</div>

        <Alert
          className={styles.alert}
          message={
            <div>
              {!lodash.isEmpty(nullFieldsMessage) && (
                <>
                  <div> {formatMessageApi({ Label_COM_WarningMessage: 'MSG_001208' })}</div>
                  {nullFieldsMessage}
                </>
              )}

              {!lodash.isEmpty(invalidFieldsMessage) && (
                <>
                  <br />
                  <div> {formatMessageApi({ Label_COM_WarningMessage: 'MSG_001209' })}</div>
                  {invalidFieldsMessage}
                </>
              )}
            </div>
          }
          type={'warning'}
          showIcon
          closable={false}
        />
        <div>{formatMessageApi({ MSG_COM_WRN: 'STWRN_000001' })}</div>
      </div>
    </Confirm>
  );
};

export default ConfirmationModal;
