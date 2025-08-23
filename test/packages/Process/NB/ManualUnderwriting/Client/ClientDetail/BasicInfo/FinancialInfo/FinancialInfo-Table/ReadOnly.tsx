import React, { useMemo } from 'react';
import { Table } from 'antd';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import useFilterTnCrtInfoList from 'process/NB/ManualUnderwriting/_hooks/useFilterTnCrtInfoList';
import useGetCrtInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetCrtInfoList';
import EditableTable from 'process/NB/ManualUnderwriting/_components/EditableTable';
import { localConfig } from './Section';
import styles from './index.less';

export default ({ expand, id }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'FinancialInfo-Table',
    localConfig,
  });
  const data = useGetCrtInfoList({ id });
  const filterData = useFilterTnCrtInfoList({ data, id });
  const columns = useMemo(() => {
    return transTableRowsConfig({
      config,
    });
  }, [config]);

  return (
    <>
      {expand && !lodash.isEmpty(filterData) ? (
        <EditableTable>
          <div className={styles.container}>
            <Table columns={columns} dataSource={filterData} pagination={false} />
          </div>
        </EditableTable>
      ) : null}
    </>
  );
};
