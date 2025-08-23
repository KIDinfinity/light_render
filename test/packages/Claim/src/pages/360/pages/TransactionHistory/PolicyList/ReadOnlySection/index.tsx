import React from 'react';
import { Col, Row } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import useExpanderController from 'navigator/hooks/useExpanderController';
import styles from './index.less';

export default ({ data, inlineFields }: any) => {
  const { isExpanderSwitchOn } = useExpanderController();
  const Field = ({ item, index }: any) => {
    return (
      <Col
        className={classnames(styles.info, styles[item.fieldType], {
          [styles.inline]: lodash.includes(inlineFields, item.key),
          [styles.expander]: isExpanderSwitchOn,
        })}
        key={index}
        span={isExpanderSwitchOn ? item.span / 4 || 3 : item.span || 12}
        data-id={item.key}
      >
        <span className={styles.label} title={item.label}>
          {item.label}
        </span>
        <span
          data-datakey={item.key}
          className={classnames(styles.value, {
            [styles.noValue]: !item.value,
            [styles.reverseFlag]: item?.key === 'reverseFlag' && item?.value === 'Y',
          })}
          title={item.value}
        >
          {item.value}
        </span>
      </Col>
    );
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.infoWrap}>
          <Row className={styles.info} gutter={[8, 8]}>
            {lodash
              .chain(data)
              .filter((item) => lodash.includes(inlineFields, item.key))
              .map((item: any, index: number) => <Field item={item} index={index} key={item.key} />)
              .value()}
          </Row>
          <Row className={classnames(styles.info, styles.info2)} gutter={[8, 8]}>
            {lodash
              .chain(data)
              .filter((item) => !lodash.includes(inlineFields, item.key))
              .map((item: any, index: number) => <Field item={item} index={index} key={item.key} />)
              .value()}
          </Row>
        </div>
      </div>
    </>
  );
};
