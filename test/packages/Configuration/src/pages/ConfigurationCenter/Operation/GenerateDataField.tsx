import React from 'react';
import lodash from 'lodash';
import { Button, Popconfirm, Icon } from 'antd';
import { useSelector,useDispatch } from 'dva';
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


function GenerateDataField(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const generateDataFieldLoading: boolean = useSelector((state: any) => state.loading.effects['configurationCenter/generateDataField']);
  const {
    functionData: { operationList },
    rows=[],
  } = props;
  const handleGenerate = async () => {
    const functionIdList = (rows && lodash.map(rows, (el: any) => el.id)) || [];
    if (!functionIdList) return;
    const response: any = await dispatch({
      type: 'configurationOperation/batchGenerateDataField',
      payload: {
        functionIdList,
      },
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess(
        formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.message.generatedatafield.success',
        })
      );
    }
  };


  return (
    <>
      {lodash.includes(operationList, 'generatedatafield') && (
        <Batch.Item>
          {() => (
            <Popconfirm
              disabled={rows.length < 1}
              title={formatMessageApi({
                Label_COM_WarningMessage: 'configurationcenter.message.generatedatafield.sure',
              })}
              onConfirm={() => handleGenerate()}
              okText={formatMessageApi({
                Label_BIZ_Claim: 'form.confirm',
              })}
              cancelText={formatMessageApi({
                Label_BIZ_Claim: 'form.cancel',
              })}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <Button
                type="danger"
                disabled={rows.length < 1}
                loading={generateDataFieldLoading}
              >
                {formatMessageApi({
                  Label_BPM_Button: 'configurationcenter.button.generateDataField',
                })}
              </Button>
            </Popconfirm>
          )}
        </Batch.Item>
      )}
    </>
  );

}
export default GenerateDataField;
