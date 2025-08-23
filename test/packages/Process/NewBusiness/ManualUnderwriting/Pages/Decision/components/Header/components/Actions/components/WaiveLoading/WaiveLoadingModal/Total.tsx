import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import useGetTotalData from './_hooks/useGetTotalData';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';

import styles from './waiveLoadingScreen.less';

const Total = () => {
  const totalFields = ['loadingPremium', 'instalmentPremiumWithTax'];
  const sectionConfig = useGetTableColumnsByPageConfig({
    section: 'WaiveLoading-Table',
    localConfig: {},
  });
  const totalData = useGetTotalData();
  const placeholderSpan = (() => {
    return (
      lodash
        .chain(sectionConfig)
        .filter((item) => !lodash.includes(totalFields, item.id))
        .map((item) => item.span)
        .sum()
        .value() - 3
    );
  })();

  return (
    <div className={classnames(styles.warp, styles.totalWarp)}>
      <div className={styles.waiveLoadingScreen}>
        <div className={classnames(styles.total, styles.row)}>
          <Row gutter={[24, 24]} className={styles.rowRow}>
            <Col span={placeholderSpan} />
            <Col span={3}>Total</Col>
            {lodash.map(totalData, (item, key) => (
              <Col
                span={item?.span || 4}
                data-id={`${key}Total`}
                className={classnames({ [styles.highlight]: item.highlight })}
                key={key}
              >
                {getFieldDisplayAmount(item.total || 0, '')}
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

Total.displayName = 'total';

export default Total;
