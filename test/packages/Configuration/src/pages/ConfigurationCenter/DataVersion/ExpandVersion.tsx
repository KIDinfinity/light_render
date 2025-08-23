import React, { useMemo } from 'react';
import { Table, Spin } from 'antd';
import { useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import {v5 as uuidv5 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { safeParseUtil } from '@/utils/utils';
import { getVersionColumns } from '../Utils/DataVersion';
import type { FunctionDataProps, CurrentMenuProps } from '../Utils/Typings';
import { ShowImageCode } from '../Utils/Constant';
import { transferCurrent } from '../Utils/Transfer';
import styles from './index.less';
interface VersionProps {
  record?: Record<string, any>;
  version?: Record<string, any>[];
  pagination?: Record<string, any>;
}
interface DataVersionProps {
  record: Record<string, any>;
}


function ExpandVersion({record = {}}: DataVersionProps) {
  const dispatch: Dispatch = useDispatch();
  const dataVersion: VersionProps[] = useSelector((state: any) => state.configurationDataImage.dataVersion);
  const currentRecord: Record<string, any> = useSelector((state: any) => state.configurationDataImage.currentRecord);
  const dataImageFunction: FunctionDataProps = useSelector((state: any) => state.configurationDataImage.dataImageFunction);
  const currentMenu: CurrentMenuProps = useSelector((state: any) => state.configurationMenu.currentMenu);
  const functionData: FunctionDataProps = useSelector((state: any) => state.configurationCenter.functionData);
  const dataImageMenu: CurrentMenuProps = useSelector((state: any) => state.configurationDataImage.dataImageMenu);
  const filterMap: any = useSelector((state: any) => state.configurationDataField.filterMap)||{};
  const versionLoading: boolean = useSelector((state: any) => state.loading.effects['configurationDataImage/queryDataVersions']);
  const { functionCode } = currentMenu;
  const isShowDataImage = lodash.includes(ShowImageCode, functionCode);
  const { functionCode: ImageMenFunctionCode} = dataImageMenu;
  const { operationList} = functionData;
  const columnsFilter = lodash.get(filterMap, ImageMenFunctionCode);
  const isNeedEditBtn =!isShowDataImage && lodash.includes(operationList, 'update');
  const { dataFieldList = [] }=dataImageFunction;

  const handlerEdit = async () => {
    const { newData, versionNo, status } = record;
    await dispatch({
      type: 'configurationCenter/showModal',
      payload: {
        current: transferCurrent(safeParseUtil(newData), status),
        type: 'update',
        parentVersionNo: versionNo,
      },
    });
  };

  const columns = useMemo(() => {
    const newColumns = getVersionColumns({
      handlerEdit,
      dataFieldList,
      columnsFilter,
      isVersionTable: false,
      isNeedEdit: isNeedEditBtn,
    });
    return lodash.map(newColumns, (item: any) => {
      if (item.sorter) {
        lodash.set(item, 'sorter', (a: any, b: any) => {
          const aText = String(a[item.dataIndex]) || '';
          const bText = String(b[item.dataIndex]) || '';
          return aText.localeCompare(bText);
        });
      }
      return item;
    });
  }, [dataFieldList,columnsFilter,isNeedEditBtn]);

  const handlerPageChange = (currentPage: number, pageSize?: number | undefined) => {
    dispatch({
      type: 'configurationDataImage/versionListPage',
      payload: {
        record,
        currentPage,
        pageSize,
      },
    });
  };

  const recordLoading = lodash.isEqual(currentRecord, record) && versionLoading;
  const target: VersionProps | undefined = dataVersion.find((el: VersionProps) =>
    lodash.isEqual(el.record, record)
  );
  const version = (target && target.version) || [];
  const pagination = (target && target.pagination) || {};

  const tableProps = {
    rowKey: (r: any) => uuidv5(JSON.stringify(r), uuidv5.URL),
    defaultExpandAllRows: true,
    className: styles.dataVersion,
    columns,
    dataSource: version,
    indentSize: 30,
    pagination: isShowDataImage
      ? {
        current: pagination.currentPage,
        ...pagination,
        onChange: handlerPageChange,
      }
      : false,
    loading: recordLoading,
  };

  return (
    <>
      {recordLoading && <Spin />}
      {/**
        //@ts-ignore */}
      {version.length > 0 && <Table {...tableProps} />}
      {!recordLoading && version.length < 1 && (
        <div className={styles.emptyData}>
          {formatMessageApi({
            Label_COM_WarningMessage: 'configurationcenter.message.NoDataVersions',
          })}
        </div>
      )}
    </>
  );

}
export default ExpandVersion;
