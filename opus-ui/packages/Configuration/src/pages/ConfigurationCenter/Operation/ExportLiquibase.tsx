import React, { useEffect } from 'react';
import { includes } from 'lodash';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import type { FunctionDataProps } from '../Utils/Typings';
import { Operation } from '../Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

interface ComponentProps {
  dispatch: Dispatch;
  functionData: FunctionDataProps;
  rows: any[];
}

export default ({ functionData, rows }: ComponentProps) => {
  const dispatch = useDispatch();
  const { operationList } = functionData;

  const handleExport = () => {
    dispatch({
      type: 'configurationExcel/showLiquibaseModal',
      payload: {
        rows,
      },
    });
  };

  const hasLiquibase = includes(operationList, Operation.EXPORTLIQUIBASE);

  useEffect(() => {
    if (hasLiquibase) {
      dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: ['Dropdown_COM_Region'],
      });
    }
  }, []);

  return (
    <>
      {hasLiquibase ? (
        <Button className={styles.btnLiquibase} onClick={handleExport}>
          {formatMessageApi({
            Label_BPM_Button: 'configurationcenter.button.exportLiquibase',
          })}
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};
