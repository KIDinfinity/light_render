import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleExportFormat } from '../Utils/ExcelUtils';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { showErrors } from '../Utils/Common';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
  searchParams: any;
}

function Download(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const exportLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/handleDownload']
  );

  const { currentMenu, searchParams, functionData } = props;
  const { functionName } = currentMenu;

  const handlerExport = async (item: any) => {
    const response: any = await dispatch({
      type: 'configurationController/handleDownload',
      payload: {
        searchParams,
        currentMenu,
        functionData,
      },
    });
    if (response.success) {
      const excelName = `${functionName}_${moment().format('YYYYMMDD_hhmm')}`;
      const { structure, recordOperationType, dataList } = response.resultData;
      handleExportFormat(dataList, structure, recordOperationType, excelName);
    } else {
      showErrors(response.promptMessages);
    }
  };

  return (
    <Button className={styles.btnDeepBlue} onClick={handlerExport} loading={exportLoading}>
      {formatMessageApi({
        Label_BPM_Button: 'configurationcenter.button.download',
      })}
    </Button>
  );
}
export default Download;
