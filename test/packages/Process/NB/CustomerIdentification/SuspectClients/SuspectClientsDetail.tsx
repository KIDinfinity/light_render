import React, { useState, useRef } from 'react';
import { Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'dva';
import classnames from 'classnames';
import lodash from 'lodash';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import useGetFieldsCustomerTypeConfig from 'basic/hooks/useGetFieldsCustomerTypeConfig';
import useSetSelectedKey from 'process/NB/CustomerIdentification/_hooks/useSetSelectedKey';
import useGetFullNameByClientInfo from 'process/NB/CustomerIdentification/_hooks/useGetFullNameByClientInfo';
import useGetColumnsByConfig from 'process/NB/CustomerIdentification/_hooks/useGetColumnsByConfig';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetRequestClientDetailData from 'process/NB/CustomerIdentification/_hooks/useGetRequestClientDetailData';
import { NAMESPACE } from 'process/NB/CustomerIdentification/activity.config';
import getColumns from './getColumns';
import styles from './index.less';
import { NbClientTag } from '../Enum';

const SuspectClientsDetail = ({ item, columnList, policy }: any) => {
  const dispatch = useDispatch();
  const couterRef = useRef();
  const data = useGetRequestClientDetailData({ item, flag: 'data', isGetNameByDefault: false });
  const ownItem = useGetRequestClientDetailData({ item, flag: 'item' });
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
  const getCleintName = useGetFullNameByClientInfo();

  const functionLoading: boolean = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/getPageAtomConfig`]
  );
  const taskNotEditable: boolean = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const atomConfig = useGetFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT002',
  });
  const clientColumnsList = useGetColumnsByConfig({ columnList, item, atomConfig });
  const isNoneEdit =
    lodash.chain(taskDetail).get('taskStatus').toLower().value() === ActivityStatus.Completed;

  const [selectedKey, setSelectedKey] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedKey,
    onSelect: (record: any, selected: boolean) => {
      if (record?.clientTag === NbClientTag.SuspectClient) {
        dispatch({
          type: `${NAMESPACE}/selectUpdateClientOption`,
          target: 'selectUpdateClientOption',
          payload: {
            policyId: policy?.id,
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
          target: 'selectNewClient',
          payload: {
            policyId: policy?.id,
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
            policyId: policy?.id,
            identificationId: selectedRow?.id,
            clientId: item?.id,
            // auditLog
            changedFields: { selection: { value: 'Y', name: 'selection', label: auditLogLabel } },
          },
        });
      }
    },
    getCheckboxProps: () => {
      const disabled = !!item?.syncSuccessfully || isNoneEdit || taskNotEditable;
      return {
        disabled,
      };
    },
    columnWidth: 30,
  };
  useSetSelectedKey({ setSelectedKey, id: policy?.id });
  return (
    <div className={styles.detail} ref={couterRef}>
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
