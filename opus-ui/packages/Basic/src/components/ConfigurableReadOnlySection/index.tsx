import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import useFormatSectionData from 'basic/hooks/useFormatSectionData';
import styles from './index.less';

const ConfigurableReadOnlySection = ({
  data,
  config,
  section,
  extraConfig,
  multipleDropdown,
  NAMESPACE,
}: any) => {
  const list = useFormatSectionData({
    section,
    config,
    data,
    currencyConfig: {
      annualPrem: {
        objectFieldName: 'nb.policyList.clientInfo.annualIncome',
      },
      policyInitialPremium: {
        objectFieldName: 'nb.policyList.policyInitialPremium',
      },
    },
    extraConfig,
    multipleDropdown,
    NAMESPACE,
  });

  if (!lodash.isPlainObject(data)) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <Row className={styles.infoList} gutter={[8, 8]}>
        {lodash
          .chain(list)
          .map((item: any, index: number) => {
            return (
              <Col
                className={styles.info}
                key={index}
                span={item.span || 6}
                data-id={`col-${item.field}`}
              >
                <span className={styles.label} title={item.label} data-id={`label-${item.field}`}>
                  {item.label}
                </span>
                <span
                  data-datakey={item.key}
                  className={styles.value}
                  title={item.value}
                  data-id={`value-${item.field}`}
                >
                  {item.value}
                </span>
              </Col>
            );
          })
          .value()}
      </Row>
    </div>
  );
};

export default ConfigurableReadOnlySection;
