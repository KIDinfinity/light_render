import React from 'react';
import { Table } from 'antd';
import { v5 as uuidv5 } from 'uuid';
import styles from './index.less';
import { localConfig } from 'opus/NewBusiness/ManualUnderwriting/Pages/Fund/_config/FundTableField';
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
  const { totalFund, config, columns } = props;
  return (
    <div className={styles.totalWrap}>
      <div className={styles.total}>
        <div style={{ width: columns?.[0]?.width }} />
        <div style={{ width: columns?.[1]?.width }}>Total</div>
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
          .map((item, index) => {
            const { span, total, key } = item;
            return (
              <div style={{ width: columns?.[Number(index) + 2]?.width }} key={key}>
                {total}
              </div>
            );
          })}
      </div>
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
  const columns = useGetFundTableColumns(configWithAllocationFilter);

  return (
    <div className={styles.fundTable}>
      <Table
        rowKey={(r: any) => uuidv5(JSON.stringify(r), uuidv5.URL)}
        dataSource={fundList}
        columns={columns}
        pagination={false}
        scroll={fundList.length > 3 ? { y: 260 } : undefined}
      />

      {fundList.length > 0 && (
        <Total totalFund={totalAllocations} config={config} columns={columns} />
      )}
    </div>
  );
};
export default FundTable;
