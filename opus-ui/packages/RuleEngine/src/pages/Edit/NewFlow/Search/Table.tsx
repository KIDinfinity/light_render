import React, { useState } from 'react';
import { Icon, Tooltip, Table } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import styles from './index.less';

interface IProps {
  ruleReferenceId: string;
  tableError: boolean;
  handleRowClick: Function;
}
export default ({ handleRowClick, tableError, ruleReferenceId }: IProps) => {
  const dispatch = useDispatch();

  const [selectKey, setSelectKey] = useState(ruleReferenceId);

  const activeCode = useSelector(
    (state: any) => state.ruleEngineController.searchData?.activeCode || ''
  );
  const data = useSelector((state: any) => state.ruleEngineController.searchData?.data || {});

  const handleTableClick = async (pagination: any) => {
    await dispatch({
      type: 'ruleEngineController/saveSearchPagination',
      payload: {
        current: pagination.current,
        activeCode,
      },
    });
    await dispatch({
      type: 'ruleEngineController/getSearchQuery',
      payload: {
        activeCode,
      },
    });
  };
  return (
    <div className={styles.table}>
      {tableError && (
        <div className={styles.icon}>
          <Tooltip
            key="toolip"
            overlayClassName={styles.toolip}
            title={formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000477' })}
            placement="leftTop"
          >
            <Icon component={ErrorSvg} />
          </Tooltip>
        </div>
      )}

      <Table
        rowKey="id"
        dataSource={data[activeCode]?.list}
        pagination={data[activeCode]?.pagination}
        onChange={handleTableClick}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [`${selectKey}`],
          onChange: async (index: any, choiceArr: any) => {
            await setSelectKey(choiceArr[0]?.id);
            await handleRowClick(choiceArr[0]);
          },
        }}
        onRow={(record: any) => ({
          onClick: async () => {
            await setSelectKey(record?.id);
            await handleRowClick(record);
          },
        })}
        columns={[
          {
            key: 'ruleSetName',
            title: 'Rule Set Name',
            dataIndex: 'ruleSetName',
          },
          {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
          },
          {
            key: 'Rule Set Id',
            title: 'ruleReferenceId',
            dataIndex: 'ruleSetId',
          },
          {
            // TODO:这个日期需要重新处理
            key: 'creationDate',
            title: 'Creation Date',
            dataIndex: 'gmtCreate',
          },
        ]}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};
