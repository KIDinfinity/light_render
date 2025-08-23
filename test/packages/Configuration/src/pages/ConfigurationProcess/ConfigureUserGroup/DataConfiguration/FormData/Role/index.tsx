import React, { useMemo } from 'react';
import { Row, Col } from 'antd';
import lodash, { isEmpty, findIndex, get } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch, useSelector } from 'dva';
import Empty from '@/components/Empty';
import Section from '../Section';
import RoleItem from './RoleItem';
import styles from './index.less';

export default ({ groupData }: any) => {
  const dispatch = useDispatch();
  const { formData, taskNotEditable, loading } = useSelector((state: any) => ({
    formData: get(state.configureUserGroupController, 'formData'),
    taskNotEditable: get(state.claimEditable, 'taskNotEditable'),
  }));
  const setUserGroup = (item: any) => {
    if (taskNotEditable) return;
    dispatch({
      type: 'configureUserGroupController/updateSelectedRole',
      payload: {
        item,
      },
    });
  };
  const getCurrent = (item: any) => {
    return (
      findIndex(
        formData?.subSection,
        (subItem: any) => item?.data?.role_code === subItem?.data?.role_code
      ) !== -1
    );
  };
  return useMemo(
    () => (
      <>
        <Section
          title={formatMessageApi({
            Label_COM_General: 'Role',
          })}
          className={styles.role}
        >
          <div className={styles.content}>
            {isEmpty(groupData) ? (
              <div className={styles.empty}>
                <Empty />
              </div>
            ) : (
              <Row gutter={[16, 16]}>
                {lodash.map(groupData, (item: any) => (
                  <Col key={item?.data?.role_code} sm={24} md={12} lg={8}>
                    <RoleItem item={item} setUserGroup={setUserGroup} getCurrent={getCurrent} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </Section>
      </>
    ),
    [formData?.subSection, groupData]
  );
};
