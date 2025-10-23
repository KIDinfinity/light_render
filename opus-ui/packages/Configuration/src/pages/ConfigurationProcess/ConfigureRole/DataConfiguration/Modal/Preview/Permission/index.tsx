import React from 'react';
import Section from 'configuration/components/Modal/Preview/Section';
import { Row, Col } from 'antd';
import Empty from '@/components/Empty';
import lodash, { isEmpty } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useDispatch } from 'dva';
import Item from './Item';
import styles from './index.less';

export default ({ dataList = [], setShowRole }: any) => {
  const dispatch = useDispatch();
  const setRole = (item: any) => {
    setShowRole(true);
    dispatch({
      type: 'configureRoleController/getRoleList',
      payload: {
        permission_code: item?.data?.permission_code,
      },
    });
  };
  return (
    <Section
      title={formatMessageApi({
        Label_COM_General: 'Permission',
      })}
    >
      <div className={styles.content}>
        <Row gutter={16}>
          {lodash.map(dataList, (item: any) =>
            !isEmpty(item?.data) ? (
              <Col  span={12}>
                <Item key={item?.data?.code} item={item} setRole={setRole} />
              </Col>
            ) : (
              <Empty />
            )
          )}
        </Row>

        {isEmpty(dataList) && <Empty />}
      </div>
    </Section>
  );
};
