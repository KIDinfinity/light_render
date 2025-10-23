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
  functionData: FunctionDataProps;
}


function InitNewCCSystem(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const initNewCCSystemLoading: boolean = useSelector((state: any) => state.loading.effects['configurationCenter/initNewCCSystem']);
  const {
    functionData: { operationList },
  } = props;

  const handleInitNewCCSystem = async () => {
    const response: any = await dispatch({
      type: 'configurationOperation/initNewCCSystem',
    });
    if (!response.success) {
      showErrors(response.promptMessages);
    } else {
      showSuccess(
        formatMessageApi({
          Label_COM_WarningMessage: 'configurationcenter.message.initCCSystem.success',
        })
      );
    }
  };

  return (
    <>
      {lodash.includes(operationList, 'initnewccsystem') && (
        <Batch.Item>
          {() => (
            <Popconfirm
              title={formatMessageApi({
                Label_COM_WarningMessage: 'configurationcenter.message.generatedatafield.sure',
              })}
              onConfirm={() => handleInitNewCCSystem()}
              okText={formatMessageApi({
                Label_BIZ_Claim: 'form.confirm',
              })}
              cancelText={formatMessageApi({
                Label_BIZ_Claim: 'form.cancel',
              })}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            >
              <Button type="danger" loading={initNewCCSystemLoading}>
                {formatMessageApi({
                  Label_BPM_Button: 'configurationcenter.button.initCCSystem',
                })}
              </Button>
            </Popconfirm>
          )}
        </Batch.Item>
      )}
    </>
  );

}
export default InitNewCCSystem;
