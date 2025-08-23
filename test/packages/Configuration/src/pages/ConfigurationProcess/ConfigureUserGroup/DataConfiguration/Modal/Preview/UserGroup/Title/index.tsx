import React from 'react';
import { Icon, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import InfoItem from './InfoItem';

export default ({ groupData, onOpenUser, userList = [] }: any) => {
  return (
    <div className={styles.header}>
      <Row gutter={0}>
        <InfoItem
          label={formatMessageApi({
            Label_COM_General: 'UserGroupCode',
          })}
          text={groupData?.data?.group_code}
        />
        <InfoItem
          label={formatMessageApi({
            Label_COM_General: 'UserGroupName',
          })}
          text={groupData?.data?.group_name}
          span={7}
        />
        <InfoItem
          label={formatMessageApi({
            Label_COM_General: 'UserGroupDescription',
          })}
          text={groupData?.data?.group_desc}
          span={7}
        />
        <Col span={4} className={styles.userCol}>
          <div className={styles.user} onClick={() => onOpenUser && onOpenUser(groupData)}>
            <Icon type="user" />
            <span>{userList?.length}Users</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};
