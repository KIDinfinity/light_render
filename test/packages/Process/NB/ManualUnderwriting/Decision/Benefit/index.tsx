import React from 'react';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import useGetTableColumns from 'process/NB/ManualUnderwriting/_hooks/useGetTableColumns';
import useGetCurrentContractTypeProductDicts from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentContractTypeProductDicts';
import useGetNumberofunitsListByProductCode from 'process/NB/ManualUnderwriting/_hooks/useGetNumberofunitsListByProductCode';
import useGetDecisionColumns from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionColumns';
import useGetWaiveListByCoreCode from 'process/NB/ManualUnderwriting/_hooks/useGetWaiveListByCoreCode';
import useGetRopList from 'process/NB/ManualUnderwriting/_hooks/useGetRopList';
import useGetSAMultiplierOPUS from 'process/NB/ManualUnderwriting/_hooks/useGetSAMultiplierOPUS';
import useGetRopPlanOptionList from 'process/NB/ManualUnderwriting/_hooks/useGetRopPlanOptionList';

import EditTable from './Edit';
import styles from './index.less';
import useJudgeWaiveProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeWaiveProductDisplay';

const Benefit = ({ coverageList }: any) => {
  useGetNumberofunitsListByProductCode();
  useGetRopPlanOptionList();
  const dicts = useGetCurrentContractTypeProductDicts();
  const sectionConfig = useGetDecisionColumns();
  const planInfoColumns = useGetTableColumns();
  lodash.map(coverageList, (item: any) => {
    const localProductName = lodash
      .chain(dicts)
      .find((e: any) => e?.productCode === item?.coreCode)
      .get('productName')
      .value();
    if (lodash.isArray(item?.waiveProductList)) {
      if (lodash.some(item.waiveProductList, (v) => lodash.isObject(v))) {
        const waiveProductList = lodash
          .chain(item.waiveProductList)
          .map((waive: any) => ({
            ...waive,
            productName: lodash
              .chain(dicts)
              .find((e: any) => e?.productCode === waive?.waiveProduct)
              .get('productName')
              .value(),
          }))
          .value();
        lodash.set(item, 'waiveProductList', waiveProductList);
      }
    }
    lodash.set(item, 'productName', localProductName);
  });
  useGetWaiveListByCoreCode();
  useGetRopList();
  useGetSAMultiplierOPUS()

  const hasWaiveCol = useJudgeWaiveProductDisplay();

  const recalSpanSize = (name: string, span: number) => {
    if (name === 'Client Name' && hasWaiveCol) return 3;
    return span;
  };

  return (
    <div className={styles.coverage}>
      <div className={styles.product}>
        <div className={classnames(styles.plan, styles.edit)}>
          <Row gutter={[16, 16]} className={styles.label}>
            {lodash.map(planInfoColumns, (item: any, index) => (
              <Col key={index} span={recalSpanSize(item?.title, item?.span)}>
                {item?.title}
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className={styles.tableWarp}>
        {lodash.map(coverageList, (item: any) => {
          return (
            <div className={styles.con} key={item?.id}>
              <EditTable item={item} config={sectionConfig} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Benefit;
