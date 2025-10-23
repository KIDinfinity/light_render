import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { useSelector,useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleExportTemplate } from '../Utils/ExcelUtils';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { showErrors } from '../Utils/Common';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
}


function ExportTemplate(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const exportTemplateLoading: boolean = useSelector((state: any) => state.loading.effects['configurationExcel/exportTemplate']);
  const {
    currentMenu: { id: functionId, functionName },
    functionData: { operationList },
  } = props;
  const handlerExportTemplate = async () => {
    const response: any = await dispatch({
      type: 'configurationExcel/exportTemplate',
      payload: {
        functionId,
      },
    });
    if (response.success) {
      const { structure, recordOperationType } = response.resultData;
      handleExportTemplate(structure, recordOperationType, functionName);
    } else {
      showErrors(response.promptMessages);
    }
  };

  return (
    <>
      {lodash.includes(operationList, 'exporttemplate') ? (
        <Button
          className={styles.btnRed}
          onClick={handlerExportTemplate}
          loading={exportTemplateLoading}
        >
          {formatMessageApi({
            Label_BPM_Button: 'configurationcenter.button.exportTemplate',
          })}
        </Button>
      ) : (
        <></>
      )}
    </>
  );

}
export default ExportTemplate;
