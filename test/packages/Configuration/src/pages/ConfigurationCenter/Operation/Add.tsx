import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import type { Dispatch } from 'redux';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDefaultObject } from '../Utils/Transfer';
import type { FunctionDataProps } from '../Utils/Typings';

interface ComponentProps {
  functionData: FunctionDataProps;
}
function Add(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const {
    functionData: { dataFieldList = [],operationList },
  } = props;
  const handleAdd = async () => {
    await dispatch({
      type: 'configurationCenter/showModal',
      payload: {
        current: getDefaultObject(dataFieldList),
        type: 'add',
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'add') ? (
        <Button icon="plus" type="primary" onClick={handleAdd}>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.add',
          })}
        </Button>
      ) : (
        <></>
      )}
    </>
  );

}
export default Add;
