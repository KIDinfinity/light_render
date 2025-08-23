import React from 'react';
import lodash from 'lodash';
import { Button, Popconfirm, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Batch } from '@/components/TableSearch';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { showErrors, showSuccess } from '../Utils/Common';

interface ComponentProps {
  TableSearch: any;
  functionData: FunctionDataProps;
  rows: any[];
  currentMenu: CurrentMenuProps;
}

function Delete(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const deleteLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationOperation/deleteBatch']
  );
  const {
    functionData: { operationList },
    rows,
    TableSearch,
    currentMenu: { dataImageActive },
  } = props;
  const disabled = tenant.activeProfile() !== 'presit';

  const handleDelete = async () => {
    const confirmDataPatch = await new Promise((r) => {
      if (disabled) {
        return r({ success: false });
      }
      dispatch({
        type: 'configurationCenter/setPromise',
        payload: {
          resolve: r,
        },
      });
    });

    const response: any = await dispatch({
      type: 'configurationOperation/deleteBatch',
      payload: {
        rows,
        confirmDataPatch,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess(dataImageActive ? 'delete Data Version success' : 'delete success');
      TableSearch.setSelectedRows?.([]);
      dispatch({
        type: 'configurationCenter/updateExpandedRows',
        payload: {
          expandedRows: [],
        },
      });
      dispatch({
        type: 'configurationCenter/refreshResult',
      });
    }
  };

  return (
    <>
      {lodash.includes(operationList, 'delete') && (
        <Batch.Item>
          {() => (
            <Popconfirm
              disabled={rows.length < 1}
              title={formatMessageApi({
                Label_BIZ_Claim: 'form.sureDelete',
              })}
              onConfirm={() => handleDelete(rows)}
              okText={formatMessageApi({
                Label_BIZ_Claim: 'form.confirm',
              })}
              cancelText={formatMessageApi({
                Label_BIZ_Claim: 'form.cancel',
              })}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <Button disabled={rows.length < 1} loading={deleteLoading}>
                {formatMessageApi({
                  Label_BIZ_Claim: 'form.delete',
                })}
              </Button>
            </Popconfirm>
          )}
        </Batch.Item>
      )}
    </>
  );
}
export default Delete;
