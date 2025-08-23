import React, { useMemo } from 'react';
import Section from 'configuration/components/Modal/Preview/Section';
import { Row, Col } from 'antd';
import Empty from '@/components/Empty';
import lodash, { isEmpty, get, findIndex } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch, useSelector } from 'dva';
import Item from './Item';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const { formData, taskNotEditable, allPermissionInfo, loading } = useSelector((state: any) => ({
    formData: get(state.configureRoleController, 'formData'),
    allPermissionInfo: get(state.configureRoleController, 'allPermissionInfo'),
    taskNotEditable: get(state.claimEditable, 'taskNotEditable'),
  }));
  const setRole = (item: any) => {
    if (taskNotEditable) return;
    dispatch({
      type: 'configureRoleController/updateSelectedPermission',
      payload: {
        item,
      },
    });
  };
  const getCurrent = (item: any) => {
    return (
      findIndex(
        formData?.subSection,
        (subItem: any) => item?.data?.permission_code === subItem?.data?.permission_code
      ) !== -1
    );
  };

  return useMemo(
    () => (
      <Section
        title={formatMessageApi({
          Label_COM_General: 'Permission',
        })}
        isBgc={false}
      >
        <div className={styles.content}>
          {isEmpty(allPermissionInfo) ? (
            <div className={styles.empty}>
              <Empty />
            </div>
          ) : (
            <Row gutter={16}>
              {lodash.map(allPermissionInfo, (item: any) =>
                !isEmpty(item?.data) ? (
                  <Col key={item?.data?.id} span={12} sm={24} xl={12} xxl={8}>
                    <Item
                      key={item?.data?.id}
                      item={item}
                      setRole={setRole}
                      getCurrent={getCurrent}
                    />
                  </Col>
                ) : (
                  <Empty />
                )
              )}
            </Row>
          )}
        </div>
      </Section>
    ),
    [formData?.subSection, allPermissionInfo]
  );
};
