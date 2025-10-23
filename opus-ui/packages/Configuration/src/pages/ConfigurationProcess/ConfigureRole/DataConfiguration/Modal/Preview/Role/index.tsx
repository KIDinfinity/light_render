import React from 'react';
import Section from 'configuration/components/Modal/Preview/Section';
import { Row, Col, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as UserGroupSvg } from 'configuration/assets/usergroup.svg';
import Form from './Form';
import styles from './index.less';

export default ({ formData, onOpenUserGroup, userGroupList = [] }: any) => {
  const title = formatMessageApi({
    Label_COM_General: 'Role',
  })
  const groupTitle = formatMessageApi({
    Label_COM_General: 'UserGroup',
  })
  return (
    <Section
      className={styles.container}
      title={title}
      containerNoPadding
    >
      <Row gutter={0}>
        <Col span={20} className={styles.form}>
          <Form formData={formData} />
        </Col>
        <Col span={4} className={styles.iconCol}>
         <div className={styles.icon} onClick={() => onOpenUserGroup && onOpenUserGroup(formData)}>
            <Icon  component={UserGroupSvg}  className={styles.group} />
            <span className={styles.ctn}>&nbsp;{userGroupList?.length}&nbsp;{groupTitle}</span>
          </div>
        </Col>
      </Row>
    </Section>
  )
}
