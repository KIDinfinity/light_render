import React from 'react';
import lodash from 'lodash';
import { Button, notification, Table } from 'antd';
import { useSelector,useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Batch } from '@/components/TableSearch';
import type { FunctionDataProps } from '../Utils/Typings';
import { showErrors, showSuccess } from '../Utils/Common';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

interface ComponentProps {
  TableSearch: any;
  functionData: FunctionDataProps;
  rows: any[];
}

function OneTouchAccess(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const oneTouchAccessLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/oneTouchAccess']);
  const {  TableSearch, functionData: { operationList },rows } = props;

  const showAddAutoSuccess = (dataSource: Record<string, any>[]) => {
    const columns = [
      {
        title: 'functionName',
        dataIndex: 'functionName',
      },
      {
        title: 'functionCode',
        dataIndex: 'functionCode',
      },
      {
        title: 'description',
        dataIndex: 'description',
      },
    ];

    notification.success({
      className: styles.notificationBox,
      message: formatMessageApi({
        Label_COM_WarningMessage: 'configurationcenter.message.oneTouchAccess.success',
      }),
      duration: 0,
      description: (
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            defaultPageSize: 5,
          }}
          rowKey={(record) => record.id}
        />
      ),
    });
  };

  const handleOnetouchAccess = async (row: Record<string, any>) => {
    const response: any = await dispatch({
      type: 'configurationOperation/oneTouchAccess',
      payload: {
        id: row.id,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      TableSearch.setSelectedRows?.([]);
      if (response.resultData && response.resultData.length) {
        showAddAutoSuccess(response.resultData);
      } else {
        const message =
          formatMessageApi({
            Label_COM_WarningMessage: 'configurationcenter.message.oneTouchAccess.success',
          }) || 'one touchAccess success';
        showSuccess(message);
      }
      dispatch({
        type: 'configurationMeby/refreshMenu',
      });
    }
  };

  return (
    <>
      {lodash.includes(operationList, 'onetouchaccess') ? (
        <Batch.Item>
          {() => (
            <Button
              className={styles.btnLightBlue}
              disabled={rows.length !== 1}
              onClick={() => handleOnetouchAccess(rows[0])}
              loading={oneTouchAccessLoading}
            >
              {formatMessageApi({
                Label_BPM_Button: 'configurationcenter.button.oneTouchAccess',
              })}
            </Button>
          )}
        </Batch.Item>
      ) : (
        <></>
      )}
    </>
  );

}
export default OneTouchAccess;
