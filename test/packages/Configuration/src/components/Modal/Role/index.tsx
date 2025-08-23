import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Modal, Icon, Spin } from 'antd';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import styles from './index.less';

export default ({
  showModal,
  dataList,
  loading,
  onCancel,
  afterClose,
  onItemClick,
  showSetting = true,
}: any) => {
  return (
    <Modal
      title={formatMessageApi({
        Label_COM_ConfigurationCenter: 'AssociatedRole',
      })}
      visible={showModal}
      width={400}
      onCancel={onCancel}
      afterClose={afterClose}
      footer={null}
      className={styles.modalUser}
    >
      {!loading ? (
        <div className={styles.content}>
          {lodash.map(dataList, (item: any) => (
            <div className={styles.user} key={item?.role_code}>
              <div className={styles.name}>{item?.role_name}</div>
              {showSetting && (
                <Icon className={styles.setting} type="setting" onClick={() => onItemClick(item)} />
              )}
            </div>
          ))}
          {!dataList || (!dataList?.length && <Empty />)}
        </div>
      ) : (
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </Modal>
  );
};
