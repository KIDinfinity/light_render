import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

import useRecalculateTotalAllocation from 'process/NB/ManualUnderwriting/_hooks/useRecalculateTotalAllocation';
import useGetFundConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFundConfig';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

const Total = ({ config }: any) => {
  const totalFundInfoList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
    shallowEqual
  );
  const totalConfig = useGetFundConfig({ totalFundInfoList, config, status: 'total' });
  const totalFundList = lodash.map(totalConfig, (item: any) => {
    const currentSum = lodash.reduce(
      totalFundInfoList,
      (result: number, reduceItem) => {
        const fundAllocation = lodash.toNumber(
          formUtils.queryValue(lodash.get(reduceItem, [item?.field]))
        );
        if (!lodash.isNaN(fundAllocation)) {
          return result + fundAllocation;
        }
        return result;
      },
      0
    );
    return {
      total: currentSum,
      span: item?.span,
      order: item?.order,
      field: item?.field,
    };
  });
  useRecalculateTotalAllocation(totalFundInfoList);

  return (
    <div className={styles.totalWrap}>
      <Row gutter={[24, 24]} className={styles.total}>
        <Col span={8} />
        <Col span={4}> Total </Col>
        {lodash.map(totalFundList, (totalFund: any, index: number) => {
          return (
            <Col span={totalFund?.span} key={`totalCol_${index}`}>
              {totalFund?.total !== 100 && (
                <ErrorTooltipManual
                  manualErrorMessage={formatMessageApi({ Label_COM_Message: 'MSG_000559' })}
                  key={`totalError_${index}`}
                />
              )}
              {totalFund?.total}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Total;
