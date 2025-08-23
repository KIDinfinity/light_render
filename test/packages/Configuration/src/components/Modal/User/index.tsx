import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Modal, Icon, Spin } from 'antd';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import styles from './index.less';

export default ({
  showUser,
  userList = [],
  loading,
  onCancel,
  afterClose,
  onUserClick,
  showSetting = true,
}: any) => {
  return (
    <Modal
      title={formatMessageApi({
        Label_COM_ConfigurationCenter: 'AssociatedUser',
      })}
      visible={showUser}
      width={400}
      onCancel={onCancel}
      afterClose={afterClose}
      footer={null}
      className={styles.modalUser}
    >
      {!loading ? (
        <div className={styles.content}>
          {lodash.map(userList, (item: any) => (
            <div className={styles.user} key={item?.user_id}>
              <div className={styles.name}>{item?.user_name}</div>
              {showSetting && (
                <Icon className={styles.setting} type="setting" onClick={() => onUserClick(item)} />
              )}
            </div>
          ))}
          {!userList || (!userList?.length && <Empty />)}
        </div>
      ) : (
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </Modal>
  );
};
