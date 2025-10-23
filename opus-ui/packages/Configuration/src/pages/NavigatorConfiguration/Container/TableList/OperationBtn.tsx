import React from 'react';
import { Batch } from '@/components/TableSearch';
import mapprops from '@/utils/mapprops';
import type {
  FunctionDataProps,
  CurrentMenuProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import styles from './index.less';
import Operators from '../Operators';

interface ComponentProps {
  TableSearch: any;
  currentMenu: CurrentMenuProps;
  functionData: FunctionDataProps;
  searchParams: any;
}

function OperationBtn(props: ComponentProps) {
  const { TableSearch, functionData, currentMenu, searchParams } = props;
  const operationList = [
    <Operators.CheckAll />,
    <Operators.Add />,
    <Operators.Update />,
    <Operators.ExportData />,
    <Operators.ExportTemplate />,
    <Operators.ImportData />,
    <Operators.Download />,
  ];

  return (
    <div className={styles.Operator}>
      <Batch {...props}>
        {mapprops(operationList, { TableSearch, functionData, currentMenu, searchParams })}
      </Batch>
    </div>
  );
}
export default OperationBtn;
