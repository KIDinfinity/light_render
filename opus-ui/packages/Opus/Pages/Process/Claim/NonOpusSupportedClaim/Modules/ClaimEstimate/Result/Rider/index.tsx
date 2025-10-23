import React from 'react';
import lodash from 'lodash';

import { Row, Col } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import Item from './Item';

import styles from './index.less';

const Main = ({ list, editable }: any) => {
  return (
    <div className={styles.riderWrap}>
      <Row gutter={6}>
        <Col span={1} className={styles.noWrap}>
          {formatMessageApi({ Label_CLM_Opus: 'riderNo' })}
        </Col>
        <Col span={3}>{formatMessageApi({ Label_CLM_Opus: 'productName' })}</Col>
        <Col span={2}>{formatMessageApi({ Label_BIZ_Policy: 'SumAssured' })}</Col>
        <Col span={3}>{formatMessageApi({ Label_CLM_Opus: 'proposedClaimDecision' })}</Col>
        <Col span={3}>{formatMessageApi({ Label_CLM_Opus: 'HSB' })}</Col>
        <Col span={3}>{formatMessageApi({ Label_CLM_Opus: 'SGB' })}</Col>
        <Col span={8}>{formatMessageApi({ Label_CLM_Opus: 'assessmentRemark' })}</Col>
      </Row>

      {lodash.map(list, (item: any, idx: number) => (
        <div key={idx} className={styles.itemWrap}>
          <Item item={item} editable={editable} />
        </div>
      ))}
    </div>
  );
};

export default Main;
