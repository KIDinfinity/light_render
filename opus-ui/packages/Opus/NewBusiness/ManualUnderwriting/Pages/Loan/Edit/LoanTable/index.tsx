import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { useDispatch } from 'dva';
import EditableTablePanel from 'opus/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import React from 'react';
import { useModalLoanDetailList } from '../../hooks';
import { localConfig } from '../../_config/LoanTableField';
import LoanTableItem from './LoanTableItem';

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

  return (
    <EditableTablePanel
      itemList={data || []}
      sectionConfig={config}
      disableDeleteItem={(_itemData, index) => index === 0}
      itemRender={(itemData, index) => <LoanTableItem data={itemData} index={index} />}
      onDeleteItem={deleteCurrentRow}
    />
  );
};

export default LoanTable;
