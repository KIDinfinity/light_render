import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useSelector, useDispatch } from 'dva';
import Inquiry from './Inquiry';
import { Columns } from './Column';
import { OperationModal, BackUpModal, UploadModal, CompareConfigModal, ScanModal } from './Modal';

export default function index() {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: any) => state.loading.effects['sqlController/getOnlineCheckList']
  );
  const onlineCheckList = useSelector((state: any) => state.sqlController.onlineCheckList);
  const selectedRow = useSelector((state: any) => state.sqlController.checkSelectedRow);
  const dataSource = onlineCheckList;
  const setSelectedRow = (list) => {
    dispatch({ type: 'sqlController/checkSetSelectedRow', payload: { list } });
  };
  useEffect(() => {
    dispatch({ type: 'sqlController/getOnlineCheckList' });
    dispatch({ type: 'sqlController/checkGetDbNameList' });
  }, []);
  return (
    <div>
      <Inquiry />
      <Table
        rowKey={(row) => row.id}
        loading={loading}
        columns={Columns({}, () => {}, null)}
        dataSource={dataSource}
        scroll={{
          x: '80vh',
          y: (document.body?.getBoundingClientRect()?.height + 100) * 0.8 - 350 + 'px',
          scrollToFirstRowOnChange: true,
        }}
        onRow={(record, rowKey) => ({
          index: rowKey,
          record,
          sourcetype: 3,
        })}
        rowSelection={{
          selectedRowKeys: selectedRow,
          onSelect: (record, selected) => {
            if (selected) {
              setSelectedRow([...selectedRow, record.id]);
            } else {
              setSelectedRow(selectedRow.filter((item) => item !== record.id));
            }
          },
          onSelectAll: (selected, selectedRows) => {
            if (selected) {
              setSelectedRow(selectedRows.map((item) => item.id));
            } else {
              setSelectedRow([]);
            }
          },
        }}
      />
      <OperationModal />
      <BackUpModal />
      <UploadModal />
      <CompareConfigModal />
      <ScanModal />
    </div>
  );
}
