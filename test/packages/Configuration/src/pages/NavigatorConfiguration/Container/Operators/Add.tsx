import React from 'react';
import lodash from 'lodash';
import { Button, Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FunctionDataProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { ReactComponent as addSvg } from 'navigator/assets/configuration/add.svg';
import { Operation } from '../../Enum';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
}

function Add({ functionData }: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.loading.effects['configurationController/handleRecord']
  );
  const { operationList } = functionData;
  const handleAdd = async () => {
    dispatch({
      type: 'configurationController/handleRecord',
      payload: {
        type: Operation.Add,
      },
    });
  };

  return (
    <>
      {lodash.includes(operationList, 'add') ? (
        <Button onClick={handleAdd} loading={loading} className={styles.btnCheckAdd}>
          <Icon component={addSvg} />
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
