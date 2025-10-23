import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Modal, Icon, Spin } from 'antd';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import styles from './index.less';

export default ({
  showUserGroup,
  userGroupList,
  loading,
  onCancel,
  afterClose,
  onUserGroupClick,
}: any) => {
  return (
    <Modal
      title={formatMessageApi({
        Label_COM_ConfigurationCenter: 'AssociatedUserGroup',
      })}
      visible={showUserGroup}
      width={400}
      onCancel={onCancel}
      afterClose={afterClose}
      footer={null}
      className={styles.modalUser}
    >
      {!loading ? (
        <div className={styles.content}>
          {lodash.map(userGroupList, (item: any) => (
            <div className={styles.user} key={item?.group_code}>
              <div className={styles.name}>{item?.group_name}</div>
              <Icon
                className={styles.setting}
                type="setting"
                onClick={() => onUserGroupClick(item)}
              />
            </div>
          ))}
          {!userGroupList || (!userGroupList?.length && <Empty />)}
        </div>
      ) : (
        <div className={styles.loading}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </Modal>
  );
};
