import React from 'react';
import lodash from 'lodash';
import { Button, Popconfirm, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Batch } from '@/components/TableSearch';
import type { FunctionDataProps } from '../Utils/Typings';
import { showErrors, showSuccess } from '../Utils/Common';

interface ComponentProps {
  TableSearch: any;
  functionData: FunctionDataProps;
  rows: any[];
}

function DeleteFunction(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const deleteFunctionLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/deleteFunction']);
  const {
    functionData: { operationList },
    rows,
    TableSearch
  } = props;
  const handleDeleteFunction = async (row: Record<string, any>) => {
    const response: any = await dispatch({
      type: 'configurationOperation/deleteFunction',
      payload: {
        id: row.id,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess('delete function success');
      TableSearch.setSelectedRows?.([]);
      await dispatch({
        type: 'configurationMenu/refreshMenu',
      });
      dispatch({
        type: 'configurationCenter/refreshResult',
      });
    }
  };

  return (
    <>
      {lodash.includes(operationList, 'deletefunction') ? (
        <Batch.Item>
          {() => (
            <Popconfirm
              disabled={rows.length !== 1}
              title={formatMessageApi({
                Label_BIZ_Claim: 'form.sureDelete',
              })}
              onConfirm={() => handleDeleteFunction(rows[0])}
              okText={formatMessageApi({
                Label_BIZ_Claim: 'form.confirm',
              })}
              cancelText={formatMessageApi({
                Label_BIZ_Claim: 'form.cancel',
              })}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <Button disabled={rows.length !== 1} loading={deleteFunctionLoading}>
                {formatMessageApi({
                  Label_BPM_Button: 'configurationcenter.button.deleteFunction',
                })}
              </Button>
            </Popconfirm>
          )}
        </Batch.Item>
      ) : (
        <></>
      )}
    </>
  );

}
export default DeleteFunction;
