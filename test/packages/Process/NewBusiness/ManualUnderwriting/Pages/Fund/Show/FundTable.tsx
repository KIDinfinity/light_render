import React from 'react';
import { Col, Row, Table } from 'antd';
import { v4 as uuid } from 'uuid';
import styles from './index.less';
import { localConfig } from 'process/NewBusiness/ManualUnderwriting/Pages/Fund/_config/FundTableField';
import {
  useFundTableConfigWithFilter,
  useGetFundTableColumns,
  useTotalAllocations,
} from '../hooks';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import lodash from 'lodash';
type ITotalProps = {
  totalFund: any;
  config: any;
};
const getLayoutByField = (configList: any[], field: string) => {
  if (configList?.length > 0) {
    const resultConfig = configList.find((config) => config.field === field);
    if (resultConfig) {
      return {
        span: lodash.get(resultConfig, 'field-props.x-layout.md.span'),
        order: lodash.get(resultConfig, 'field-props.x-layout.md.order'),
      };
    }
  }
  return {
    span: 1,
    order: 1,
  };
};
const Total = (props: ITotalProps) => {
  const { totalFund, config } = props;

  return (
    <div className={styles.totalWrap}>
      <Row gutter={[58, 24]} className={styles.total}>
        <Col span={8} />
        <Col span={4}> Total </Col>
        {Object.entries(totalFund)
          .map(([key, total]) => {
            const { span, order } = getLayoutByField(config, key);
            return {
              total,
              key,
              span,
              order,
            };
          })
          .sort((a, b) => a.order - b.order)
          .map((item) => {
            const { span, total, key } = item;
            return (
              <Col span={span} key={key}>
                {total}
              </Col>
            );
          })}
      </Row>
    </div>
  );
};
interface IFundTableProps {
  fundList: any[];
}
const FundTable = ({ fundList }: IFundTableProps) => {
  const config = useGetSectionAtomConfig({ localConfig, section: 'Fund-Table' });
  const totalAllocations = useTotalAllocations(fundList, config);
  const configWithAllocationFilter = useFundTableConfigWithFilter(fundList, config);
  console.log('🚀 ~ FundTable ~ fundList:', fundList);
  const columns = useGetFundTableColumns(configWithAllocationFilter);
  const filterFundList = lodash.filter(fundList, (item) => {
    return !(
      !Number(item?.fundAllocation) &&
      !Number(item.adHocTopUpAllocation) &&
      !Number(item.epaAllocation) &&
      !Number(item.tpaAllocation) &&
      !Number(item.tpaRcdAllocation)
    );
  });

  return (
    <div className={styles.fundTable}>
      <Table
        rowKey={(r: any) => uuid(JSON.stringify(r), uuid.URL)}
        dataSource={filterFundList}
        columns={columns}
        pagination={false}
        scroll={fundList.length > 3 ? { y: 260 } : undefined}
      />
      <Total totalFund={totalAllocations} config={config} />
    </div>
  );
};
export default FundTable;
