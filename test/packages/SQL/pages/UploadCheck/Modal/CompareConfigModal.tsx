import React, { useEffect } from 'react';
import { Table, Collapse, Spin, Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { OPERATION_TYPE } from 'sql/enum';
import styles from './CompareConfigModal.less';
// import { CompareColumns } from '../Column';
import ResizeModal from '@/components/ResizeModal';
import classNames from 'classnames';
const { Panel } = Collapse;
import { formatMessageApi } from '@/utils/dictFormatMessage';

function BackUpModal() {
  const dispatch = useDispatch();
  const compareConfig = useSelector((state: any) => state.sqlController.compareConfig);
  const type = useSelector((state: any) => state.sqlController?.checkModalType);
  const loading = useSelector(
    (state: any) => state.loading.effects['sqlController/checkCompareConfig']
  );
  const exportLoading: boolean = useSelector(
    (state: any) => state.loading.effects['sqlController/checkComparePrint']
  );
  const visible = OPERATION_TYPE.COMPARE === type;

  const closeModal = () => {
    dispatch({
      type: 'sqlController/checkOpenModal',
      payload: {
        type: OPERATION_TYPE.NUll,
      },
    });
    dispatch({
      type: 'sqlController/setCheckCompareConfig',
      payload: {
        list: [],
      },
    });
  };

  const exportCur = (data, tableName, dbName) => {
    dispatch({ type: 'sqlController/checkComparePrint', payload: { data, tableName, dbName } });
  };

  const exportAll = (data) => {
    console.log(data.filter((item) => item?.existDiff));
    dispatch({
      type: 'sqlController/checkComparePrint',
      payload: {
        data: data.filter((item) => item?.existDiff),
        type: 'all',
      },
    });
  };

  const computerCompareConfig = compareConfig?.map((item) => ({
    ...item,
    dataSource: item?.existDiff
      ? [
          ...(item?.addList?.map((addItem) => ({ ...addItem, type: 'addList' })) || []),
          ...(item?.deleteList?.map((deleteItem) => ({ ...deleteItem, type: 'deleteList' })) || []),
          ...(item?.updateList?.map((updateItem) => ({
            ...updateItem,
            ...updateItem?.tableData,
            type: 'updateList',
          })) || []),
          ...(item?.duplicateList
            ?.map((duplicateItem, index) =>
              duplicateItem?.map((duplicateArrayItem) => ({
                ...duplicateArrayItem,
                type: 'duplicateList',
                duplicateArrayItemGroup: index,
              }))
            )
            ?.flat() || []),
        ]
      : [],
  }));

  const CompareColumns = (list) => {
    return list.map((listItem) => ({
      title: formatMessageApi({ ['Label_BIZ_Claim']: listItem }),
      dataIndex: listItem,
      key: listItem,
      render: (text: any, item: any) => {
        if (
          item.type === 'updateList' &&
          item.updateDetailList.find((updateItem) => updateItem.updateField === listItem)
        ) {
          return (
            <div>
              <p className={styles.nowData}>{text}</p>
              <p className={styles.jiantou}>⬆</p>
              <p className={styles.beforeData}>
                {
                  item.updateDetailList.find((updateItem) => updateItem.updateField === listItem)
                    ?.before
                }
              </p>
            </div>
          );
        } else {
          return text || '-';
        }
      },
      width: 120,
    }));
  };
  useEffect(() => {
    if (visible) {
      dispatch({
        type: 'sqlController/checkCompareConfig',
      });
    }
  }, [visible]);

  return (
    <ResizeModal
      height={(document.body?.getBoundingClientRect()?.height + 100) * 0.8}
      width={(document.body?.getBoundingClientRect()?.width + 100) * 0.8}
      moveTop={56}
      visible={visible}
      setVisible={closeModal}
      className={styles.modal}
    >
      <Button
        type="primary"
        className={styles.exportALL}
        onClick={exportAll.bind(null, computerCompareConfig)}
        loading={exportLoading}
      >
        Export All
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Collapse className={styles.checkTableBox}>
          {computerCompareConfig?.map((item, index) => (
            <Panel
              className={classNames({
                [styles.panel]: item?.existDiff,
                [styles.disabledPanel]: !item?.existDiff,
              })}
              showArrow={false}
              header={
                <p className={styles.colorWhite}>
                  <p>
                    <span className={styles.label}>tableName: </span>
                    <span>{item.tableName} </span>
                    <span className={styles.label}>dbName: </span>
                    <span>{item.dbName}</span>
                    <span className={styles.label}>{!item?.existDiff ? '  no change' : ''}</span>
                  </p>
                  {item?.existDiff && (
                    <Button
                      className={styles.exportBtn}
                      onClick={exportCur.bind(null, item.dataSource, item.tableName, item.dbName)}
                      loading={exportLoading}
                      type="primary"
                    >
                      Export
                    </Button>
                  )}
                </p>
              }
              disabled={!item?.existDiff}
              key={index}
            >
              {item?.existDiff && (
                <Table
                  className={styles.table}
                  rowKey={(row) => row.id}
                  columns={CompareColumns(['type', ...(item?.tableFieldList || [])])}
                  scroll={{
                    x: '80vh',
                    y: (document.body?.getBoundingClientRect()?.height + 100) * 0.8 - 280 + 'px',
                    scrollToFirstRowOnChange: false,
                  }}
                  dataSource={item.dataSource}
                  onRow={(record, rowKey) => ({
                    index: rowKey,
                    record,
                    sourcetype: 3,
                  })}
                />
              )}
            </Panel>
          ))}
        </Collapse>
      )}
    </ResizeModal>
  );
}
export default BackUpModal;
