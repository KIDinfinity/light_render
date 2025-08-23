import React from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
import {  useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import type {
  FunctionDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { ReactComponent as editSvg } from 'navigator/assets/configuration/edit.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Operation } from '../../Enum';

interface ComponentProps {
  functionData: FunctionDataProps;
  rows: any;
}

function Update(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { operationList },
    rows,
  } = props;
  const handlerEdit = async () => {
    dispatch({
      type: 'configurationController/handleRecord',
      payload: {
        type: Operation.UPDATE_Multiple,
        rows,
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'update') ? (
        <Button
          style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
          disabled={rows?.length < 2}
          onClick={() => {
            handlerEdit();
          }}
        >
          <Icon component={editSvg} />
          {formatMessageApi({
            Label_BPM_Button: 'configurationcenter.button.updateMultiple',
          })}
        </Button>
      ) : (
        <></>
      )}
    </>
  );

}
export default Update;
