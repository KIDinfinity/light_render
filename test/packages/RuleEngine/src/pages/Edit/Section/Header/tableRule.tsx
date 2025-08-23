import React from 'react';
import { Upload } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import Button from './button';
import { ButtonType, AddType, Action } from '../../Enum';
import { handleMessageModal } from '@/utils/commonMessage';
import validateError from './validateError';
import type { Workbook } from 'exceljs';
import ExcelJS from 'exceljs';
import styles from './index.less';

interface IProps {
  groupId: string;
}

export default ({ groupId }: IProps) => {
  const { taskNotEditable } = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const handlerImport = async ({ file }: any) => {
    const reader = new FileReader();
    const workbook = new ExcelJS.Workbook();

    try {
      reader.onload = async () => {
        const arrayBuffer: any = reader.result;
        workbook.xlsx.load(arrayBuffer).then((wb: Workbook) => {
          const rowData: Record<string, any>[] = [];
          let header: string[] = [];

          wb.worksheets[0].eachRow((row: any, rowNumber: number) => {
            // 获得表头
            const values = row.values.slice(1);
            if (rowNumber === 1) {
              header = values;
            } else {
              rowData.push(lodash.zipObject(header, values));
            }
          });
          const uploadList = rowData.map((item) =>
            Object.fromEntries(
              Object.entries(item).map((objectItem) => [
                objectItem[0],
                lodash.isUndefined(objectItem[1]) ? '' : String(objectItem[1]),
              ])
            )
          );
          const error = validateError(uploadList);
          if (!lodash.isEmpty(error)) {
            handleMessageModal(error);
            return;
          }
          dispatch({
            type: 'ruleEngineController/uploadExcel',
            payload: {
              list: uploadList,
              groupId,
            },
          });
        });
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      // throw 'error';
    }
  };

  const list = [
    {
      key: ButtonType.IMPORT,
      labelId: 'venus_claim.ruleEngine.label.button.importData',
      handleClick: () => {},
    },
    {
      key: ButtonType.SEARCH,
      labelId: 'venus_claim.ruleEngine.label.button.existingRule',
      handleClick: () => {
        dispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.Rules,
            params: {
              groupId,
            },
          },
        });
      },
    },
    {
      key: ButtonType.ADD,
      labelId: 'venus_claim.ruleEngine.label.button.addToLibrary',
      handleClick: () => {
        dispatch({
          type: 'ruleEngineController/addRuleToLibrary',
          payload: {
            groupId,
          },
        });
      },
    },
    {
      key: ButtonType.NEW,
      labelId: 'venus_claim.ruleEngine.label.button.newRule',
      handleClick: () => {
        dispatch({
          type: 'ruleEngineController/showRuleEditData',
          payload: {
            action: Action.Add,
            groupId,
          },
        });
      },
    },
  ];
  return (
    <div className={styles.tableRuleWrap}>
      {lodash.map(list, (item: any) => {
        return item.key === ButtonType.IMPORT ? (
          <Upload
            showUploadList={false}
            onChange={handlerImport}
            beforeUpload={() => false}
            disabled={taskNotEditable}
            accept=".xls,.xlsx,.csv"
            key={item.key}
          >
            <Button key={item.key} item={item} disabled={taskNotEditable} />
          </Upload>
        ) : (
          <Button key={item.key} item={item} disabled={taskNotEditable} />
        );
      })}
    </div>
  );
};
