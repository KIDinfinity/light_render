import React from 'react';
import { useSelector } from 'dva';
import { Col, Row } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';
import BreakdownItem from './BreakdownItem';
import styles from './BreakdownList.less';

const BreakdownList = () => {
  const claimServiceItemBreakDownList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimServiceItemBreakDownList
  );

  return (
    <div className={styles.breakdownList}>
      <div className={styles.head}>
        <Row>
          <Col span={10}>
            {formatMessageApi({
              Label_BIZ_Claim: 'breakdownPeriod',
            })}
          </Col>
          <Col span={8} className={styles.expense}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.expense',
            })}
          </Col>
          <Col span={6} className={styles.unit}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.unit',
            })}
          </Col>
        </Row>
      </div>
      <div className={styles.body}>
        {lodash.map(claimServiceItemBreakDownList, (item: any) => (
          <BreakdownItem data={item} />
        ))}
      </div>
    </div>
  );
};

export default BreakdownList;
