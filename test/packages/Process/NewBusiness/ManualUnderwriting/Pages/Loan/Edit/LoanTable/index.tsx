import React from 'react';
import { useDispatch } from 'dva';
import LoanTableItem from './LoanTableItem';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import EditableTablePanel from 'process/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from '../../_config/LoanTableField';
import { useModalLoanDetailList } from '../../hooks';
import { Region, tenant } from '@/components/Tenant';

const LoanTable = () => {
  const dispatch = useDispatch();
  const config = useGetSectionAtomConfig({ localConfig, section: 'Load-Table' });
  const data = useModalLoanDetailList();
  const deleteCurrentRow = (record: any) => {
    dispatch({
      type: `${NAMESPACE}/deleteLoanItem`,
      payload: {
        id: record.id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [record.id] },
    });
  };
  const disableTable =
    tenant.region({
      [Region.KH]: false,
      [Region.MY]: true,
    }) || false;
  return (
    <EditableTablePanel
      disableHeader={disableTable}
      itemList={data || []}
      disableDeleteItem={(_itemData, index) => index === 0}
      onDeleteItem={deleteCurrentRow}
      sectionConfig={config}
      disableAdd={disableTable}
      disableOverflow={true}
      itemRender={(itemData, index) => <LoanTableItem data={itemData} index={index} />}
    />
  );
};

export default LoanTable;
