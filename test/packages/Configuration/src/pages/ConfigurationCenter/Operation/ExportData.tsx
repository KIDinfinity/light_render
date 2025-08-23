import React from 'react';
import lodash from 'lodash';
import { Button, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleExport } from '../Utils/ExcelUtils';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { showErrors } from '../Utils/Common';
import styles from './index.less';

interface ComponentProps {
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
  searchParams: any;
}

function ExportData(props: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const exportLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationExcel/exportData']
  );
  const currentTempMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationMenu.currentMenu
  );
  const { currentMenu, searchParams, functionData } = props;
  const { functionName, functionCode } = currentMenu;
  const { functionName: tempName, functionCode: tempCode } = currentTempMenu;
  const { operationList } = functionData;
  /**
   * obj=> {0:{},1:{}...}
   */
  const transferCsv = (obj: any) => {
    let head = '';
    const content = lodash
      .keys(obj)
      .map((keyItem) => {
        if (!head) {
          head = lodash
            .keys(obj[keyItem])
            .map((objKey: any) => JSON.stringify(objKey))
            .join(',');
        }

        return lodash
          .values(obj[keyItem])
          .map((objItem: any) => {
            let returnString = objItem;
            if (objItem === null) {
              return '';
            }
            if (/^[0-9]*-[0-9]*-[0-9]* [0-9]*:[0-9]*:[0-9]*$/.test(objItem)) {
              returnString = moment(objItem).format('DD/MM/YYYY hh:mm:ss');
            }
            return JSON.stringify(returnString);
          })
          .join(',');
      })
      .join('\r\n');
    return `${head}\r\n${content}`;
  };

  const configs = {
    csv: (resultData: any, excelName: any) => {
      const { dataList } = resultData;

      if (lodash.isObject(dataList) && !lodash.isNull(dataList)) {
        const blob = new Blob([transferCsv(dataList)], {
          type: 'text/csv',
        });
        return saveAs(blob, `${excelName}.csv`);
      }

      return saveAs('', `${excelName}.csv`);
    },
    json: (resultData: any, excelName: any) => {
      const { dataList } = resultData;

      const blob = new Blob([JSON.stringify(dataList)], { type: 'text/json' });
      return saveAs(blob, `${excelName}.json`);
    },
    xlsx: (
      resultData: { structure: any; recordOperationType: any; dataList: any },
      excelName: string
    ) => {
      const { structure, recordOperationType, dataList } = resultData;
      handleExport(dataList, structure, recordOperationType, excelName);
    },
  };

  const handlerExport = async (item: any) => {
    const response: any = await dispatch({
      type: 'configurationExcel/exportData',
      payload: {
        searchParams,
        currentMenu,
        functionData,
      },
    });
    if (response.success) {
      const excelName =
        tempName === functionName && tempCode === functionCode
          ? functionName
          : `${tempName}-${functionName}`;
      configs[item](response.resultData, excelName);
    } else {
      showErrors(response.promptMessages);
    }
  };

  const ButtonList = () => {
    return (
      <>
        {['xlsx', 'json', 'csv'].map((item: any) => (
          <Button
            key={item}
            onClick={() => {
              handlerExport(item);
            }}
            className={classnames(styles.exportBtn, styles.btnGreen)}
          >
            {item}
          </Button>
        ))}
      </>
    );
  };

  return (
    <>
      {lodash.includes(operationList, 'exportdata') ? (
        <Tooltip title={ButtonList} trigger="hover" overlayClassName={styles.exportBtnTooltip}>
          <Button className={styles.btnGreen} loading={exportLoading}>
            {formatMessageApi({
              Label_BPM_Button: 'configurationcenter.button.exportData',
            })}
          </Button>
        </Tooltip>
      ) : (
        <></>
      )}
    </>
  );
}
export default ExportData;
