import React from 'react';
import lodash from 'lodash';
import { Button, Upload } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { getFileData } from '../Utils/ExcelUtils';
import type { FunctionDataProps } from '../Utils/Typings';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
}

function ImportData(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const importLoading: boolean = useSelector(
    (state: any) => state.configurationController.importLoading
  );
  const {
    functionData: { operationList, dataFieldList = [] },
  } = props;
  const handlerImport = async ({ file }: any) => {
    await dispatch({
      type: 'configurationController/changeImportLoading',
      payload: {
        importLoading: true,
      },
    });
    const excelData = await getFileData(file, dataFieldList);

    await dispatch({
      type: 'configurationController/showExcelModal',
      payload: {
        excelData,
      },
    });
    await dispatch({
      type: 'configurationController/changeImportLoading',
      payload: {
        importLoading: false,
      },
    });
  };

  return (
    <>
      {lodash.some(operationList, (operationItem) =>
        lodash.includes(['add', 'update'], operationItem)
      ) ? (
        <Upload
          showUploadList={false}
          onChange={handlerImport}
          beforeUpload={() => false}
          accept=".xls,.xlsx,.csv"
        >
          <Button className={styles.btnBlue} loading={importLoading}>
            {formatMessageApi({
              Label_BPM_Button: 'configurationcenter.button.importData',
            })}
          </Button>
        </Upload>
      ) : (
        <></>
      )}
    </>
  );
}
export default ImportData;
