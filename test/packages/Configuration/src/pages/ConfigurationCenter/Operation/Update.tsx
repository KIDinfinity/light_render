import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { transferCurrent } from '../Utils/Transfer';

interface ComponentProps {
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
  record: any;
}

function Update(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { operationList },
    currentMenu: { id: functionId },
    record,
  } = props;
  const handlerEdit = async () => {
    await dispatch({
      type: 'configurationCenter/queryGangedDropdownByFunction',
      payload: {
        record,
        functionId,
      },
    });
    await dispatch({
      type: 'configurationCenter/showModal',
      payload: {
        current: transferCurrent(record),
        type: 'update',
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'update') ? (
        <Button
          type="primary"
          shape="circle"
          style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
          icon="edit"
          onClick={() => {
            handlerEdit();
          }}
        />
      ) : (
        <></>
      )}
    </>
  );

}
export default Update;
