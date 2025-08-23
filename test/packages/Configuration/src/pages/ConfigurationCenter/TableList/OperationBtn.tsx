import React from 'react';
import { Batch } from '@/components/TableSearch';
import mapprops from '@/utils/mapprops';
import lodash from 'lodash';
import Operation from '../Operation';
import Filter from './Filter';
import styles from './index.less';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { FuncHistoryCode } from '../Utils/Constant';
import { getHistoryDataField } from '../History/Column';

interface ComponentProps {
  TableSearch: any;
  currentMenu: CurrentMenuProps;
  functionData: FunctionDataProps;
  searchParams: any;
}

function OperationBtn(props: ComponentProps) {
  const { TableSearch, currentMenu, functionData, searchParams } = props;
  const operationList = [
    <Operation.Add />,
    <Operation.Delete />,
    <Operation.DeleteFunction />,
    <Operation.ExportData />,
    <Operation.ExportTemplate />,
    <Operation.GenerateDataField />,
    <Operation.ImportData />,
    <Operation.OneTouchAccess />,
    <Operation.Approve />,
    <Operation.Reject />,
    <Operation.DeleteDatasource />,
    <Operation.DeleteMetadata />,
    <Operation.DeleteDraftVersion />,
    <Operation.Submit />,
    <Operation.InitNewCCSystem />,
    <Operation.ExportLiquibase />,
    <Operation.DownloadData />,
    <Operation.DownloadAllFileList />,
    <Operation.UploadSQL />,
    <Operation.DownloadSQL />,
  ];
  const { functionCode } = currentMenu;
  const isFunctionHistory = functionCode === FuncHistoryCode;

  const newfunctionData = () => {
    const newData = lodash.cloneDeep(functionData);
    const { dataFieldList } = newData;
    if (isFunctionHistory) {
      lodash.set(newData, 'dataFieldList', getHistoryDataField(dataFieldList));
    }
    return newData;
  };

  return (
    <div className={styles.Operator}>
      <div className={styles.filter}>
        <Filter currentMenu={currentMenu} functionData={newfunctionData()} />
      </div>
      <Batch {...props}>
        {mapprops(operationList, { TableSearch, functionData, currentMenu, searchParams })}
      </Batch>
    </div>
  );
}
export default OperationBtn;
