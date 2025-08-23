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


function DeleteDraftVersion(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const deleteDraftVersionLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/deleteDraftVersion']);
  const {
    functionData: { operationList },
    TableSearch,
    rows
  } = props;
  const handleDeleteDraftVersion = async () => {
    const response: any = await dispatch({
      type: 'configurationOperation/deleteDraftVersion',
      payload: {
        rows,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess(
        formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.message.deleteDraftVersion.success',
        })
      );
      TableSearch.setSelectedRows?.([]);
      dispatch({
        type: 'configurationCenter/updateExpandedRows',
        payload: {
          expandedRows: [],
        },
      });
      dispatch({
        type: 'configurationDataImage/refreshResult',
      });
    }
  };
  return (
    <>
      {lodash.includes(operationList, 'deletedraftversion') && (
        <Batch.Item>
          {() => (
            <Popconfirm
              disabled={rows.length < 1}
              title={formatMessageApi({
                Label_BIZ_Claim: 'form.sureDelete',
              })}
              onConfirm={() => handleDeleteDraftVersion()}
              okText={formatMessageApi({
                Label_BIZ_Claim: 'form.confirm',
              })}
              cancelText={formatMessageApi({
                Label_BIZ_Claim: 'form.cancel',
              })}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <Button disabled={rows.length < 1} loading={deleteDraftVersionLoading}>
                {formatMessageApi({
                  Label_BPM_Button: 'configurationcenter.button.deleteDraftVersion',
                })}
              </Button>
            </Popconfirm>
          )}
        </Batch.Item>
      )}
    </>
  );

}
export default DeleteDraftVersion;
