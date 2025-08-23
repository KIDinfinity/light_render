import React, { useEffect } from 'react';
import Section from 'configuration/components/Modal/Preview/Section';
import ItemWrapTooltip from 'configuration/components/Modal/ItemWrapTooltip';
import { Row, Col, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as UserGroupSvg } from 'configuration/assets/usergroup.svg';
import { useSelector,useDispatch } from 'dva';
import Form from './Form';
import styles from './index.less';

export default ({  userGroupList = [] }: any) => {
  const dispatch = useDispatch();
  const title = formatMessageApi({
    Label_COM_General: 'Role',
  })
  const groupTitle = formatMessageApi({
    Label_COM_General: 'UserGroup',
  })
  const userGroupTitle=formatMessageApi({
    Label_COM_ConfigurationCenter: 'AssociatedUserGroup',
  })
  const { isUpdate } = useSelector((state: any) =>({
    isUpdate:state?.configureRoleController?.isUpdate
  }));
  const { formData } = useSelector((state: any) => state.configureRoleController);
  useEffect(() => {
    if (formData?.data?.role_code && isUpdate) {
      dispatch({
        type: 'configureRoleController/getUserGroupList',
        payload: {
          role_code: formData?.data?.role_code,
        },
      });
    }
  }, [formData?.data?.role_code]);
  return (
    <Section
      className={styles.container}
      title={title}
      containerNoPadding
    >
      <Row gutter={0}>
        <Col span={isUpdate?20:24} className={styles.form}>
          <Form formData={formData} />
        </Col>
        {isUpdate&&<Col span={4} className={styles.iconCol}>
          <ItemWrapTooltip className={styles.iconWrap} list={userGroupList} title={userGroupTitle}  code='group_code' name='group_name' >
            <div className={styles.icon}>
            <Icon  component={UserGroupSvg}  className={styles.group} />
              <span  className={styles.ctn}>&nbsp;{userGroupList?.length}&nbsp;{groupTitle}</span>
            </div>
          </ItemWrapTooltip>
        </Col>}
      </Row>
    </Section>

  )
}
