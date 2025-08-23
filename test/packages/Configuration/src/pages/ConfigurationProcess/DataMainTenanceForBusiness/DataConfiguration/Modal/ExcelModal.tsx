import React from 'react';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Modal, Table, notification, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type {
  ExcelDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import ErrorCode from 'claim/enum/ErrorCode';
import ErrorType from 'configuration/pages/ConfigurationCenter/Enum/ErrorType';
import { checkDuplicate } from 'configuration/utils';
import styles from './index.less';

interface ComponetProps {
  loadingImport: boolean;
}

const checkError = (errorMessage: any[], errorType: string) =>
  lodash.some(errorMessage, (el) => el.type === errorType);

function ExcelModal(props: ComponetProps) {
  const dispatch: Dispatch = useDispatch();
  const functionData: any = useSelector((state: any) => state.dataConfigurationController.functionData);
  const showExcelModal: boolean = useSelector((state: any) => state.dataConfigurationController.showExcelModal);
  const excelData: ExcelDataProps = useSelector((state: any) => state.dataConfigurationController.excelData);
  const listPage: any = useSelector((state: any) => state.dataConfigurationController.listPage);
  const {  loadingImport } = props;

  const onCancel = () => {
    dispatch({
      type: 'dataConfigurationController/hideExcelModal',
    });
  };

  const onOk = async () => {
    const rows = listPage?.rows || [];
    const rowData = lodash.map(excelData?.rowData, (el) => ({
      ...el,
      cc_key: uuidv4(),
    }));
    if (
      checkError(excelData?.errorMessage, ErrorType.lose) ||
      checkError(excelData?.errorMessage, ErrorType.errData)
    ) {
      notification.error({
        message: formatMessageApi({ Label_COM_WarningMessage: ErrorCode.ERR_000246 }),
      });
      return;
    }
    const { isDuplicate } = checkDuplicate({
      functionData,
      changeData: rows,
      compareData: rowData,
      data: true,
    });

    if (isDuplicate) {
      notification.error({
        message: formatMessageApi({ Label_COM_WarningMessage: ErrorCode.ERR_000247 }),
      });
      return;
    }

    dispatch({
      type: 'dataConfigurationController/saveListPage',
      payload: {
        listPage: {
          ...listPage,
          rows: rows?.concat(rowData),
        },
      },
    });
    dispatch({
      type: 'dataConfigurationController/hideExcelModal',
    });
    dispatch({
      type: 'dataConfigurationController/saveExcelData',
      payload: {
        excelData: {},
      },
    });
  };

  const handlerCloseModal = () => {
    dispatch({
      type: 'dataConfigurationController/saveExcelData',
      payload: {
        excelData: {},
      },
    });
  };
  const { columns = [], rowData:data = [] } = excelData;
  return (
    <Modal
      title={formatMessageApi({
        Label_COM_WarningMessage: 'configurationcenter.message.importCheck',
      })}
      visible={showExcelModal}
      width={1200}
      className={styles.excelModal}
      onCancel={onCancel}
      afterClose={handlerCloseModal}
      footer={
        <>
          <Button onClick={onCancel}>
            {formatMessageApi({
              Label_BIZ_Claim: 'form.cancel',
            })}
          </Button>
          <Button type="primary" onClick={onOk} loading={loadingImport}>
            {formatMessageApi({
              Label_BIZ_Claim: 'form.confirm',
            })}
          </Button>
        </>
      }
      confirmLoading={loadingImport}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      <Table
        rowKey={(r, i) => `${i}`}
        columns={columns}
        scroll={{ x: 'max-content' }}
        dataSource={data || []}
      />
    </Modal>
  );

}
export default ExcelModal;
