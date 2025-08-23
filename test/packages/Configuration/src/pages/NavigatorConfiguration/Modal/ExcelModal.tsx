import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal, Table, Descriptions, Divider, Tag, Button, Tabs as AntTabs } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import {v5 as uuidv5 } from 'uuid';
import styles from './index.less';
import {
  transferExcelDataForImport,
  getErrorForResponseImport,
  exportErorrExccel,
} from '../Utils/ExcelUtils';
import type { ExcelDataProps, CurrentMenuProps, DataFieldProps } from '../Utils/Typings';
import { showSuccess } from '../Utils/Common';
import { Tabs } from '../Utils/Constant';

const { TabPane } = AntTabs;

function ExcelModal() {
  const dispatch: Dispatch = useDispatch();
  const dataFieldList: DataFieldProps[] = useSelector(
    (state: any) => state.configurationController.functionData?.dataFieldList
  );
  const showExcelModal: boolean = useSelector(
    (state: any) => state.configurationController.showExcelModal
  );
  const currentMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationController.currentMenu
  );
  const excelData: ExcelDataProps = useSelector(
    (state: any) => state.configurationController.excelData
  );
  const importErrors: ExcelDataProps = useSelector(
    (state: any) => state.configurationController.importErrors
  );
  const currentTab: string = useSelector((state: any) => state.configurationTabs.currentTab);
  const loadingImport: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/importData']
  );
  const loadingImportDataVersion: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/importDataByVersion']
  );

  const errorColumns = [
    {
      key: 'rows',
      title: 'rows',
      dataIndex: 'rows',
      width: 80,
    },
    {
      key: 'description',
      title: 'description',
      dataIndex: 'description',
      width: 150,
    },
    {
      key: 'detail',
      title: 'detail',
      dataIndex: 'detail',
      render: (text: any, record: any) => {
        return lodash.map(record?.list, (fieldItem: any) => (
          <Tag
            color="#f50"
            className={styles.errorTag}
            key={uuidv5(JSON.stringify(fieldItem), uuidv5.URL)}
          >
            {fieldItem.field} <span style={{ color: '#000' }}> ({fieldItem.message})</span>
          </Tag>
        ));
      },
    },
  ];

  const { fileInfoVO, columns = [], rowData = [], errorMessage = [] } = excelData;
  const { fileName = '', fileSize = '', modificationTime = '' } = fileInfoVO || {};
  const { rowData: importRowData = [] } = importErrors;
  const { id: functionId, dataImageActive, functionName, functionCode } = currentMenu;

  const onCancel = () => {
    dispatch({
      type: 'configurationController/hideExcelModal',
    });
  };

  const getSuccessMsg = (msg: any) => {
    const successMsg = formatMessageApi({
      Label_COM_WarningMessage: `configurationcenter.message.${
        dataImageActive ? 'importDataByVersion' : 'import'
      }.success`,
    });
    if (dataImageActive) {
      return (
        <>
          <p>{successMsg}</p>
          <p>uploadBatchNo：{msg}</p>
        </>
      );
    }
    return successMsg;
  };

  const onOk = async () => {
    const totalRecords = transferExcelDataForImport(rowData);
    // const confirmDataPatch = await new Promise((r) => {
    //   // if (disabled) {
    //   //   return r({ success: false });
    //   // }
    //   dispatch({
    //     type: 'configurationController/setPromise',
    //     payload: {
    //       resolve: r,
    //     },
    //   });
    // });

    const response: any = await dispatch({
      type: `configurationController/${dataImageActive ? 'importDataByVersion' : 'importData'}`,
      payload: {
        fileInfoVO,
        functionId,
        totalRecords,
        confirmDataPatch: { success: false },
        functionCode,
      },
    });

    if (response.success) {
      showSuccess(getSuccessMsg(response.resultData), {
        duration: dataImageActive ? 10 : 5,
      });

      dispatch({
        type: 'configurationController/hideExcelModal',
      });
      dispatch({
        type: 'configurationController/resetExcelData',
      });
      dispatch({
        type: 'configurationController/saveImportErrors',
        payload: {
          importErrors: [],
        },
      });
      if (currentTab === Tabs[0]) {
        dispatch({
          type: `configurationController/refreshResult`,
        });
      } else {
        dispatch({
          type: `configurationDataImage/refreshResult`,
        });
      }
    } else {
      // 处理excel错误 validation_exception
      // eslint-disable-next-line no-lonely-if
      const errors = getErrorForResponseImport(response.promptMessages[0].code);
      dispatch({
        type: 'configurationController/saveImportErrors',
        payload: {
          importErrors: response.promptMessages[0].code.split('(;)'),
        },
      });
    }
  };

  const handlerCloseModal = () => {
    dispatch({
      type: 'configurationController/resetExcelData',
    });
    dispatch({
      type: 'configurationController/saveImportErrors',
      payload: {
        importErrors: [],
      },
    });
  };

  const handlerExportErrorExcel = () => {
    const { rowData: errMsg } = importErrors;
    exportErorrExccel(rowData, errMsg, functionName, dataFieldList);
  };

  return (
    <Modal
      title={formatMessageApi({
        Label_COM_WarningMessage: 'configurationcenter.message.importCheck',
      })}
      visible={showExcelModal}
      width={1200}
      onCancel={onCancel}
      afterClose={handlerCloseModal}
      footer={
        <>
          {importRowData.length > 0 && (
            <Button className={styles.btnDanger} onClick={handlerExportErrorExcel}>
              {formatMessageApi({
                Label_BPM_Button: 'configurationcenter.button.exportErrorExcel',
              })}
            </Button>
          )}
          <Button onClick={onCancel}>
            {formatMessageApi({
              Label_BIZ_Claim: 'form.cancel',
            })}
          </Button>
          {!errorMessage.length && !importRowData.length && rowData.length && (
            <Button type="primary" onClick={onOk} loading={loadingImport}>
              {formatMessageApi({
                Label_BIZ_Claim: 'form.confirm',
              })}
            </Button>
          )}
        </>
      }
      confirmLoading={loadingImport || loadingImportDataVersion}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      <Descriptions bordered layout="vertical" className={styles.descriptions} column={4}>
        <Descriptions.Item label="fileName">{fileName}</Descriptions.Item>
        <Descriptions.Item label="size">{fileSize}</Descriptions.Item>
        <Descriptions.Item label="lastModified">{modificationTime}</Descriptions.Item>
        <Descriptions.Item label="functionName">{currentMenu.functionName}</Descriptions.Item>
        <Descriptions.Item label="Error">
          <AntTabs>
            {lodash.isArray(errorMessage) &&
              lodash.map(errorMessage, (item: any) => (
                <TabPane tab={item.type} key={item.type}>
                  <Table
                    rowKey={(r, i) => `${i}`}
                    columns={errorColumns}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 680px)' }}
                    dataSource={item.list || []}
                  />
                </TabPane>
              ))}
          </AntTabs>
        </Descriptions.Item>
      </Descriptions>

      {importErrors.length > 0 && (
        <>
          <Divider dashed />
          <div className={styles.errorTitle}>
            {formatMessageApi({
              Label_COM_WarningMessage: 'configurationcenter.message.errorMessage',
            })}
          </div>
          <div className={styles.descriptions}>
            {importErrors.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </>
      )}

      {errorMessage.length < 1 && (
        <>
          <Divider dashed />
          <Table
            rowKey={(r, i) => `${i}`}
            columns={columns}
            scroll={{ x: 'max-content' }}
            dataSource={rowData || []}
          />
        </>
      )}
    </Modal>
  );
}
export default ExcelModal;
