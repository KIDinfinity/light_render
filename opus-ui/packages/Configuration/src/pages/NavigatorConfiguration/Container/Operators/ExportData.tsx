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
import { getFormat } from 'configuration/pages/NavigatorConfiguration/Utils/getFormatField';

interface ComponentProps {
  functionData: FunctionDataProps;
  currentMenu: CurrentMenuProps;
  searchParams: any;
}

function ExportData(props: ComponentProps) {
  const noFormatName = [
    'creator',
    'gmt_create',
    'gmt_modified',
    'id',
    'trans_id',
    '#operation',
    'modifier',
    'is_deleted',
  ];
  const dispatch: Dispatch = useDispatch();
  const exportLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/exportData']
  );
  const currentTempMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationMenu.currentMenu
  );
  const { currentMenu, searchParams, functionData } = props;
  const { functionName, functionCode } = currentMenu;

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
        const newDataList = Object.fromEntries(
          Object.entries(dataList).map(([key, value]) => {
            const newValue = Object.fromEntries(
              Object.entries(value).map(([valueKey, valueValue]) => {
                const neyKey = noFormatName.includes(valueKey)
                  ? valueKey
                  : `${valueKey}/${getFormat(valueKey)}`;
                return [neyKey, valueValue];
              })
            );
            return [key, newValue];
          })
        );
        const blob = new Blob([transferCsv(newDataList)], {
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
      type: 'configurationController/exportData',
      payload: {
        searchParams,
        currentMenu,
        functionData,
      },
    });
    if (response.success) {
      const excelName = `${functionName}-${moment().format('YYYY年MM月DD日h时m分')}`;
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
      {lodash.some(operationList, (operationItem) =>
        lodash.includes(['add', 'update'], operationItem)
      ) ? (
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
