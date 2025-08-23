import React from 'react';

import TakeOverTableItem from './TakeOverTableItem';
import AddItem from './AddItem';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

import { localConfig } from '../../_config/TakeOverTableField';

import { useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import EditableTablePanel from 'process/NewBusiness/ManualUnderwriting/_components/EditableTablePanel';
interface IProps {
  data?: any[];
}
const TakeOverTable = ({ data }: IProps) => {
  const dispatch = useDispatch();
  const config = useGetSectionAtomConfig({ localConfig, section: 'TakeOver-Table' });

  const deleteCurrentRow = (record: any) => {
    dispatch({
      type: `${NAMESPACE}/deleteTakeOverItem`,
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
      itemRender={(itemData, index) => <TakeOverTableItem data={itemData} index={index} />}
      onDeleteItem={deleteCurrentRow}
      addButtonRender={() => <AddItem />}
    />
  );
};
export default TakeOverTable;
