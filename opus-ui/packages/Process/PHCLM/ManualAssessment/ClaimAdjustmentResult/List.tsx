import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Row, Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from '../activity.config';

import styles from './index.less';

const List = () => {
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
  );
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.listPolicy
  );

  const datas = useMemo(() => {
    const tempMap: any = formUtils.cleanValidateData(claimPayableListMap);

    return lodash
      .chain(tempMap)
      .groupBy('policyNo')
      .omit([undefined, null, ''])
      .map((list: any, key: string) => {
        const children = lodash.map(list, (childrenItem: any) => {
          const {
            policyNo,
            productCode: coreProductCode,
            isPayableAdjusted = 0,
            payableAmount,
            originPayableAmount,
            isNewPayable
          } = childrenItem || {};

          const { mainProductName, productName } =
            lodash.find(listPolicy, { coreProductCode, policyNo }) || {};
          if(isNewPayable) {
            return {
              product: `${coreProductCode} -- ${productName}`,
              mainProductName,
              adjustPayableAmount: payableAmount,
              originPayableAmount: null,
            }
          }
          return {
            product: `${coreProductCode} -- ${productName}`,
            mainProductName,
            adjustPayableAmount: !!isPayableAdjusted ? payableAmount : null,
            originPayableAmount: !!isPayableAdjusted ? originPayableAmount : payableAmount,
          };
        });
        return {
          policyNo: list?.[0]?.policyNo,
          adjustPayableAmount: lodash.reduce(
            children,
            (amount: any, { adjustPayableAmount }: any) =>
              lodash.isNumber(adjustPayableAmount) ? (amount || 0) + adjustPayableAmount : amount,
            null
          ),
          originPayableAmount: lodash.reduce(
            children,
            (amount: any, { originPayableAmount }: any) =>
              lodash.isNumber(originPayableAmount) ? (amount || 0) + originPayableAmount : amount,
            null
          ),
          mainProductName: children?.[0]?.mainProductName || '',
          children,
          key,
        };
      })
      .orderBy('viewOrder')
      .value();
  }, [claimPayableListMap, listPolicy]);

  return (
    <div className={styles.listWrap}>
      <div className={styles.title}>Adjustment Overview Information</div>

      <div className={styles.list}>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <Row className={styles.amountTitle}>
              <Col span={12} className={styles.center}>
                Original Claim Amount
              </Col>
              <Col span={12} className={styles.center}>
                Adjustment Claim Amount
              </Col>
            </Row>
          </Col>
        </Row>
        {lodash.map(datas, (item: any) => (
          <>
            <div className={styles.item} key={item.key}>
              <Row className={classNames(styles.policyWrap)}>
                <Col span={16}>
                  <span className={styles.policyTitle}>Policy No. {item.policyNo} </span>
                  <span className={styles.policyDes}>({item?.mainProductName || []})</span>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col
                      span={12}
                      className={classNames(styles.plicyAmount, styles.plicyOriginAmount)}
                    >
                      {item.originPayableAmount}
                    </Col>
                    <Col
                      span={12}
                      className={classNames(styles.plicyAmount, styles.plicyAdjustAmount)}
                    >
                      {item.adjustPayableAmount}
                    </Col>
                  </Row>
                </Col>
              </Row>

              <div className={styles.childrenWrap}>
                {lodash.map(item.children, (childrenItem: any) => (
                  <Row key={childrenItem.product}>
                    <Col span={16} className={styles.childrenTitle}>
                      {childrenItem.product}
                    </Col>
                    <Col span={8}>
                      <Row>
                        <Col
                          span={12}
                          className={classNames(styles.center, styles.plicyOriginAmount)}
                        >
                          {childrenItem.originPayableAmount}
                        </Col>
                        <Col
                          span={12}
                          className={classNames(styles.center, styles.plicyAdjustAmount)}
                        >
                          {childrenItem.adjustPayableAmount}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
export default List;
