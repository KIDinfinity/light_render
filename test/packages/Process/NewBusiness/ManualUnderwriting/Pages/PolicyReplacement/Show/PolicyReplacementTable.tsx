import React, { useMemo } from 'react';
import { Table } from 'antd';
import { v4 as uuid } from 'uuid';
import lodash from 'lodash';

import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import { getFieldDisplayAmount } from '@/utils/accuracy';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import { localConfig } from '../_config/PolicyReplacementTableField';
import { useReplacementInfoDefaultClientName } from '../hooks';

interface IProps {
  data?: any[];
}
const PolicyReplacementTable = ({ data = [] }: IProps) => {
  const config = useGetSectionAtomConfig({
    section: 'PolicyReplacement-Table',
    localConfig,
  });
  const defaultDicts = useReplacementInfoDefaultClientName();
  const ownReplacementInfoList = lodash
    .chain(data)
    .map((item: any) => {
      return {
        ...item,
        sumAssured: getFieldDisplayAmount(
          item?.sumAssured,
          'nb.policyList.replacementInfoList.sumAssured'
        ),
        insuredSeqNo: item?.insuredSeqNo
          ? lodash.find(defaultDicts, (dict) => dict?.dictCode === item?.insuredSeqNo)?.dictName
          : undefined,
      };
    })
    .value();

  const newConfig = useMemo(() => {
    return lodash
      .chain(config)
      .filter(
        (item) =>
          item?.['field-props']?.visible === 'Y' && lodash.get(item, 'field') !== 'clientName'
      )
      .value();
  }, [config]);
  const columns = useMemo(() => {
    return transTableRowsConfig({
      config: newConfig,
    });
  }, [newConfig]);
  return (
    <Table
      rowKey={(r: any) => uuid(JSON.stringify(r), uuid.URL)}
      dataSource={ownReplacementInfoList}
      columns={columns}
      pagination={false}
    />
  );
};
export default PolicyReplacementTable;
