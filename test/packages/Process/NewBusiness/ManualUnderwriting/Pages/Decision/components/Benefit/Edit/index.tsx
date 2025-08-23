import React, { useMemo, useState, useRef } from 'react';
import { Row, Col, Button, Spin } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import useGetTableColumns from 'decision/components/Benefit/Edit/_hooks/useGetTableColumns';
import useGetCurrentContractTypeProductDicts from 'decision/components/Benefit/_hooks/useGetCurrentContractTypeProductDicts';
import useGetNumberofunitsListByProductCode from 'decision/_hooks/useGetNumberofunitsListByProductCode';
import useGetDecisionColumns from 'decision/components/Benefit/_hooks/useGetDecisionColumns';
import useGetWaiveListByCoreCode from 'decision/components/Benefit/_hooks/useGetWaiveListByCoreCode';
import useGetRopList from 'decision/components/Benefit/_hooks/useGetRopList';
import useGetSAMultiplierOPUS from 'decision/components/Benefit/_hooks/useGetSAMultiplierOPUS';
import EditItem from './components/EditItem';
import styles from './index.less';
import useJudgeWaiveProductDisplay from 'decision/components/Benefit/_hooks/useJudgeWaiveProductDisplay';
import useHandleAddRiderCallback from './_hooks/useHandleAddRiderCallback';
import useGetPlaninfotableEditable from './_hooks/useGetPlaninfotableEditable';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Action } from '@/components/AuditLog/Enum';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';

const BenefitEdit = () => {
  useGetNumberofunitsListByProductCode();

  const dicts = useGetCurrentContractTypeProductDicts();
  const sectionConfig = useGetDecisionColumns();
  const planInfoColumns = useGetTableColumns();
  const coverageList = useGetCoverageList('edit');
  const _coverageList = useMemo(() => {
    return lodash.map(coverageList, (item: any) => {
      const _item = { ...item };
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
          lodash.set(_item, 'waiveProductList', waiveProductList);
        }
      }
      lodash.set(_item, 'productName', localProductName);
      return _item;
    });
  }, [coverageList, dicts]);
  const basicCurrencyCode = useMemo(() => {
    return lodash.find(_coverageList, (item: any) => item?.isMain === 'Y')?.currencyCode;
  }, [_coverageList]);

  useGetWaiveListByCoreCode();
  useGetRopList();
  useGetSAMultiplierOPUS();
  const scrollRef = useRef(null);
  const [scrollX, setScrollx] = useState(0);

  const hasWaiveCol = useJudgeWaiveProductDisplay();

  const recalSpanSize = (name: string, span: number) => {
    if (name === 'Client Name' && hasWaiveCol) return 3;
    return span;
  };

  const handleAddRider = useHandleAddRiderCallback();

  const addProductButtonEditable = useGetPlaninfotableEditable();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRecalculate = async () => {
    setLoading(true);

    await dispatch({
      type: `${NAMESPACE}/reCalculate`,
      payload: {
        action: Action.Recalculate,
        // TODO:这里应该区分两者
        type: OptionType.recalculatePp,
      },
    });
    setLoading(false);
  };
  const handleScroll = () => {
    setScrollx(scrollRef?.current?.scrollLeft || 0);
  };
  return (
    <div>
      <div className={styles.operation}>
        <Button
          onClick={() => {
            handleRecalculate();
          }}
          className={styles.recal}
          size="small"
          disabled={loading}
          loading={loading}
        >
          Re-Calculate
        </Button>
        <Button
          onClick={() => {
            handleAddRider();
          }}
          size="small"
          disabled={!addProductButtonEditable}
        >
          Add Product
        </Button>
      </div>
      <div className={styles.content} ref={scrollRef} onScroll={handleScroll}>
        <div className={styles.coverage}>
          <div className={styles.product}>
            <div className={classnames(styles.plan, styles.edit)}>
              <Row gutter={[16, 16]} className={styles.label}>
                {lodash.map(planInfoColumns, (item: any, index) => (
                  <Col key={index} span={recalSpanSize(item?.title, item?.span)}>
                    {item?.title}
                  </Col>
                ))}
                <div className={styles.closeArea} />
              </Row>
            </div>
          </div>
          <div className={styles.tableWarp}>
            {_coverageList.length ? (
              lodash.map(_coverageList, (item: any, index: number) => {
                return (
                  <div className={styles.con} key={`${item?.id}-${index}`}>
                    <EditItem
                      item={item}
                      config={sectionConfig}
                      basicCurrencyCode={basicCurrencyCode}
                      scrollX={scrollX}
                    />
                  </div>
                );
              })
            ) : (
              <div className={styles.loading}>
                <Spin />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitEdit;
