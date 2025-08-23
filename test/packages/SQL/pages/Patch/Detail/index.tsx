import React, { useMemo, useState } from 'react';
import { Table, Button, Icon } from 'antd';
import { useDispatch, useSelector } from 'umi';
import moment from 'moment';
import classnames from 'classnames';
import { tenant } from '@/components/Tenant';
import ExpandedRow from './ExpandedRow';
import PatchModal from '../PatchModal';
import DeletePatchModal from '../DeletePatchModal';

import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [type, setType] = useState('add');
  const [selectItem, setSelectItem] = useState([]);
  const enums = ['currentEnvironment', 'currentRegion', 'environments', 'regions'];
  const data = useSelector((state: any) => state.sqlController.tempDataPatch.patchList);
  const disabled = tenant.activeProfile() !== 'presit';

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectItem(selectedRows);
      },
    }),
    []
  );

  const columnsRender = useMemo(
    () => [
      { title: 'Patch Name', dataIndex: 'patchName', key: 'patchName' },
      {
        title: 'Create Time',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (value) => moment(Number(value)).format('L'),
      },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
      {
        title: 'Operation',
        dataIndex: 'operation',
        width: '100px',
        render: (value, record) => {
          return (
            <div className={styles.operationGroup}>
              <div className={classnames('ant-table-row-expand-icon', styles.operationIcon)}>
                <Icon
                  type="edit"
                  theme="filled"
                  onClick={() => {
                    const patchItems = record.patchItems.map((item) => {
                      return Object.fromEntries(
                        Object.entries(item).map((valueItem) => {
                          return [
                            valueItem[0],
                            enums.includes(valueItem[0]) ? valueItem[1]?.split(',') : valueItem[1],
                          ];
                        })
                      );
                    });

                    dispatch({
                      type: 'sqlController/savePatch',
                      payload: { changedFields: { ...record, patchItems } },
                    });

                    setType('update');
                    setVisible(true);
                  }}
                />
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className={styles.detail}>
      {!disabled && (
        <div className={styles.button}>
          <Button
            onClick={() => {
              dispatch({
                type: 'sqlController/initPatch',
              });
              setType('add');
              setVisible(true);
            }}
            type="primary"
            icon="plus"
          >
            Data Patch
          </Button>
          <Button
            type="primary"
            icon="delete"
            onClick={() => {
              setDeleteVisible(true);
            }}
          >
            Data Patch
          </Button>
        </div>
      )}
      <Table
        dataSource={data}
        columns={columnsRender}
        rowKey="createTime"
        rowSelection={rowSelection}
        expandedRowRender={(e) => {
          return <ExpandedRow data={e.patchItems} />;
        }}
      />
      <PatchModal visible={visible} setVisible={setVisible} type={type} />
      <DeletePatchModal
        visible={deleteVisible}
        setVisible={setDeleteVisible}
        deletables={selectItem}
      />
    </div>
  );
};
