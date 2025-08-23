import React, { useMemo } from 'react';
import { Table } from 'antd';
import { v4 as uuid } from 'uuid';
import lodash from 'lodash';

import transTableRowsConfig from 'basic/utils/transTableRowsConfig';

import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import { localConfig } from '../_config/TakeOverTableField';

interface IProps {
  data?: any[];
}
const TakeOverTable = ({ data = [] }: IProps) => {
  const config = useGetSectionAtomConfig({
    section: 'TakeOver-Table',
    localConfig,
  });
  const newConfig = useMemo(() => {
    return lodash
      .chain(config)
      .filter((item) => item?.['field-props']?.visible === 'Y')
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
      dataSource={data}
      columns={columns}
      pagination={false}
    />
  );
};
export default TakeOverTable;
