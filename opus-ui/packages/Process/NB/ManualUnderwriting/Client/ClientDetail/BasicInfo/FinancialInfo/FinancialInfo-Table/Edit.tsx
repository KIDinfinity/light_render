import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import EditableTable from 'process/NB/ManualUnderwriting/_components/EditableTable';
import useDeleteCrtItem from 'process/NB/ManualUnderwriting/_hooks/useDeleteCrtItem';
import useGetTnCrtInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetTnCrtInfoList';
import useFilterTnCrtInfoList from 'process/NB/ManualUnderwriting/_hooks/useFilterTnCrtInfoList';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import EditItem from './EditItem';
import styles from './index.less';
import { localConfig } from './Section';


const FinancialinfoTable = ({ id, isSubCard }: any) => {
  const financialInfoTableConfig = useGetSectionAtomConfig({
    section: 'FinancialInfo-Table',
    localConfig,
  });
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  const finnalConfig = lodash.isFunction(gateway)
    ? gateway({ config: financialInfoTableConfig })
    : financialInfoTableConfig;

  const data = useGetTnCrtInfoList({ id });
  const filterData = useFilterTnCrtInfoList({ data, Edit: 'Edit', id });
  const handleDelete = useDeleteCrtItem({ id });

  return (
    <div className={styles.container}>
      <EditableTable
        handleDelete={handleDelete}
        titleClassName={styles.titleClass}
        config={finnalConfig}
      >
        {lodash.map(filterData, (item: any, index: number) => (
          <EditItem
            rowIndex={index}
            id={id}
            crtItemId={item.id}
            item={item}
            key={item.id}
            data-hiddenDeleteButton={index === filterData.length - 1}
          />
        ))}
      </EditableTable>
    </div>
  );
};

export default connect()(Form.create<any>({})(FinancialinfoTable));
