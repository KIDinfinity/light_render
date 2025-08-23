import React, { useState } from 'react';
import { Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'dva';
import classnames from 'classnames';
import lodash from 'lodash';

import { NAMESPACE } from '../activity.config';

import {
  useSetSelectedKey,
  useGetColumnsByConfig,
  useGetFullNameByClientInfo,
  useGetRequestClientDetailData,
} from '../_hooks';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import getColumns from './getColumns';
import styles from './index.less';
import { NbClientTag } from '../Enum';

const SuspectClientsDetail = ({ item, policyId, act002Config }: any) => {
  const dispatch = useDispatch();

  const columnList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.columnList) || [];

  const functionLoading: boolean = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/getPageAtomConfig`]
  );
  const taskNotEditable: boolean = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );

  const clientColumnsList = useGetColumnsByConfig({ columnList, item, atomConfig: act002Config });
  const data = useGetRequestClientDetailData({ item, flag: 'data' });
  const ownItem = useGetRequestClientDetailData({ item, flag: 'item' });
  const getCleintName = useGetFullNameByClientInfo();

  const [selectedKey, setSelectedKey] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedKey,
    onSelect: (record: any, selected: boolean) => {
      if (record?.clientTag === NbClientTag.SuspectClient) {
        dispatch({
          type: `${NAMESPACE}/selectUpdateClientOption`,
          target: 'selectUpdateClientOption',
          payload: {
            policyId: policyId,
            clientId: item?.id,
            changedFields: {
              updateClientOption: undefined,
            },
          },
        });
      }
    },
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      const selectedRow = lodash.head(selectedRows);
      const key = lodash.findKey(data, { id: selectedRowKeys[0] });
      const firstColumn =
        key === '0'
          ? formatMessageApi({ Dropdown_IND_ClientTag: 'RequestData' })
          : `${formatMessageApi({ Dropdown_IND_ClientTag: 'SuspectClient' })} ${key} ${
              selectedRow?.laClientId || ''
            } `;
      const auditLogLabel = `${firstColumn} （${getCleintName({ clientInfo: item })})`;

      if (selectedRow?.dataFromSmart === true) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: `selectNewClient`,
          payload: {
            policyId,
            clientId: selectedRow?.id,
            // auditLog
            changedFields: {
              newClientFlag: { value: 'Y', name: 'newClientFlag', label: auditLogLabel },
            },
          },
        });
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'selectSuspectClient',
          payload: {
            policyId,
            identificationId: selectedRow?.id,
            clientId: item?.id,
            // auditLog
            changedFields: { selection: { value: 'Y', name: 'selection', label: auditLogLabel } },
          },
        });
      }
    },
    getCheckboxProps: () => {
      const disabled = !!item?.syncSuccessfully || taskNotEditable;
      return {
        disabled,
      };
    },
    columnWidth: 30,
  };
  useSetSelectedKey({ setSelectedKey, id: policyId });

  return (
    <div className={styles.detail}>
      {!functionLoading ? (
        <Table
          // scroll={{ x: 'max-content' }}
          className={classnames({
            [styles.increaseTable]: getColumns(clientColumnsList, ownItem)?.length > 10,
            [styles.cursor]: taskNotEditable,
          })}
          rowKey={(record: any) => record.id}
          dataSource={data}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          columns={getColumns(clientColumnsList, ownItem)}
          pagination={false}
        />
      ) : (
        <div className={styles.emptyBox}>
          <Spin tip="Loading..." size="small" />
        </div>
      )}
    </div>
  );
};

export default SuspectClientsDetail;
