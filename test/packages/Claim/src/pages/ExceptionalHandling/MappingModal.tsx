import { Modal, Icon } from 'antd';
import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import styles from './MappingModal.less';

export default ({ visible, errorInfoList = [], onCancel, onOk }: any) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      title={formatMessageApi({
        MSG_COM_General: 'MSG_000411',
      })}
      okText={formatMessageApi({
        Label_BPM_Button: 'Yesplease',
      })}
      cancelText={formatMessageApi({
        Label_BPM_Button: 'Nothanks',
      })}
      maskClosable={false}
      closable={false}
      className={styles.modal}
      centered
    >
      {lodash.map(errorInfoList, (item) => {
        const returnCode = formUtils.queryValue(item?.errorInfo?.returnCode);
        const exceptionCategory = formUtils.queryValue(item?.errorInfo?.exceptionCategory);
        return (
          <div className={styles.modalContent}>
            <div>
              <div>
                {formatMessageApi({
                  Label_COM_Exception: 'ErrorCode',
                })}
              </div>
              <div className={styles.code}>{returnCode}</div>
            </div>
            <div>
              <Icon type="swap" className={styles.swapIcon} />
            </div>
            <div>
              <div>
                {formatMessageApi({
                  Label_COM_Exception: 'ExceptionCategory',
                })}
              </div>
              <div className={styles.code}>
                {formatMessageApi({
                  Dropdown_CFG_ExceptionCategory: exceptionCategory,
                })}
              </div>
            </div>
          </div>
        );
      })}
    </Modal>
  );
};
