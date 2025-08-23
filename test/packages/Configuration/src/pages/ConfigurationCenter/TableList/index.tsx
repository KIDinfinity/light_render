import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TableSearch, { Table } from '@/components/TableSearch';
import lodash from 'lodash';
import {v5 as uuidv5 } from 'uuid';
import { useDispatch, useSelector } from 'dva';
import type { Dispatch } from 'redux';
import Search from './Search';
import styles from './index.less';
import ResizableColumns from './Resizable';
import OperationBtn from './OperationBtn';
import ExpandVersion from '../DataVersion/ExpandVersion';
import Operation from '../Operation';
import { setVersionRender } from '../Utils/DataVersion';
import { getColumns } from '../Utils/FormUtils';
import type { ResultDataProps, CurrentMenuProps, FunctionDataProps } from '../Utils/Typings';
import { ShowImageCode, FuncHistoryCode, FuncMenuImage } from '../Utils/Constant';
import { isSelectable } from '../Utils/Operator';
import getHistoryColumn from '../History/Column';
import ExpandHistory from '../History/ExpandHistory';
import { transferCurrent } from '../Utils/Transfer';

function TableList({ extraColumns = [] }: any) {
  const [TableSearchRef, setTableSearchRef] = useState(null);
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector(
    (state: any) => state.configurationCenter.functionData
  );
  const resultData: ResultDataProps = useSelector(
    (state: any) => state.configurationCenter.resultData
  );
  const currentMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationMenu.currentMenu
  );
  const filterMap: any = useSelector((state: any) => state.configurationDataField.filterMap) || {};
  const isTabSearch: boolean = useSelector((state: any) => state.configurationTabs.isTabSearch);
  const expandedRows: string[] = useSelector(
    (state: any) => state.configurationCenter.expandedRows
  );
  const searchDefault: any = useSelector((state: any) => state.configurationCenter.searchDefault);
  const searchParams: any = useSelector((state: any) => state.configurationCenter.searchParams);
  const dataImageMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationDataImage.dataImageMenu
  );
  const tableLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationCenter/listPage']
  );
  const functionLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationCenter/findFunction']
  );
  const { dataFieldList, operation, defaultSort, operationList = [] } = functionData;
  const { rows = [], ...pagination } = resultData;
  const { functionCode, dataImageActive, id: functionId } = currentMenu;
  const { functionCode: ImageMenFunctionCode = '' } = dataImageMenu || {};
  const isDataImageFunction = lodash.includes(FuncMenuImage, functionCode);
  const isDataVersionList = lodash.includes(ShowImageCode, functionCode);
  const isFunctionHistory = functionCode === FuncHistoryCode;
  const isShowExpand = !!(
    (dataImageActive && ImageMenFunctionCode) ||
    isDataVersionList ||
    isFunctionHistory
  );
  const columnsFilter = lodash.get(filterMap, functionCode);

  const onSearch = async (values = {}) => {
    if (!functionData.id || !isTabSearch) {
      return;
    }
    await dispatch({
      type: 'configurationCenter/listPage',
      payload: {
        functionId,
        functionCode,
        ...values,
      },
    });
  };

  const handleResize = (column: any) => async (e: any, { size }: any) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch({
      type: 'configurationCenter/resizeCellWidth',
      payload: {
        fieldName: column.key,
        width: size.width,
      },
    });
  };

  const getFieldColumns = () => {
    let fieldColumns: any = isFunctionHistory
      ? getHistoryColumn(dataFieldList, columnsFilter)
      : getColumns({
        dataFieldList,
        columnsFilter,
        defaultSort,
      }) || [];
    fieldColumns = [
      ...fieldColumns,
      ...extraColumns,
      {
        title: '', // 处理占位
      },
    ];
    if (lodash.includes(operation, 'update')) {
      fieldColumns.unshift({
        title: formatMessageApi({
          Label_BIZ_Claim: 'form.operate',
        }),
        width: 80,
        render: (el: any, record: any) => (
          <Operation.Update record={record} functionData={functionData} currentMenu={currentMenu} />
        ),
      });
    }

    return lodash.map(fieldColumns, (col: any) => {
      isDataImageFunction && setVersionRender(col, dataFieldList);
      return {
        ...col,
        onHeaderCell: (column: any) => ({
          width: column.width,
          onResize: handleResize(column),
        }),
      };
    });
  };

  const handlerExpand = async (expanded: boolean, record: any) => {
    if (expanded) {
      if (isDataVersionList) {
        // 展开版本历史
        await dispatch({
          type: 'configurationDataImage/versionListPage',
          payload: {
            record,
          },
        });
      } else if (isFunctionHistory) {
        // batch_no 的历史状态变更
        await dispatch({
          type: 'configurationDataImage/listAllHistoryByPage',
          payload: {
            record,
          },
        });
      } else {
        // 展开数据 dataVersion
        await dispatch({
          type: 'configurationDataImage/queryDataVersions',
          payload: {
            record,
            functionId,
          },
        });
      }
    }
  };

  const handlerExpandedRowsChange = async (expandedRowsData: string[]) => {
    dispatch({
      type: 'configurationCenter/updateExpandedRows',
      payload: {
        expandedRows: expandedRowsData,
      },
    });
  };

  const columns = getFieldColumns();
  let tableProps = {
    rowKey: (r: any, i: number) => uuidv5(`${JSON.stringify(r)}-${i}`, uuidv5.URL),
    selectable: isSelectable(operationList),
    columns,
    scroll: { x: 'max-content' },
    loading: tableLoading,
    sortMore: true,
    components: {
      header: {
        cell: ResizableColumns,
      },
    },
    onRow: (record: any) => {
      return {
        onDoubleClick: () => {
          dispatch({
            type: 'configurationCenter/saveCopyModal',
            payload: {
              current: transferCurrent(record),
              showCopyModal: true,
            },
          });
        },
      };
    },
    data: {
      list: rows || [],
      pagination: {
        page: pagination.currentPage,
        ...pagination,
      },
    },
  };
  if (isShowExpand) {
    tableProps = lodash.assign(tableProps, {
      onExpand: handlerExpand,
      expandedRowKeys: expandedRows,
      expandedRowRender: (record: any) =>
        isFunctionHistory ? <ExpandHistory record={record} /> : <ExpandVersion record={record} />,
      onExpandedRowsChange: handlerExpandedRowsChange,
    });
  }
  useEffect(() => {
    if (TableSearchRef) {
      TableSearchRef.setSelectedRows?.([]);
      TableSearchRef.setStateOfSearch({
        params: {},
      });
    }
  }, [functionData.id, TableSearchRef]);
  return (
    <>
      <div className={styles.tableContent}>
        {functionId && (
          <>
            {!functionLoading ? (
              <TableSearch
                onSearch={onSearch}
                searchDefault={searchDefault}
                wrappedComponentRef={(c: any) => {
                  setTableSearchRef(c);
                }}
              >
                <Search />
                <OperationBtn
                  TableSearch={TableSearchRef}
                  functionData={functionData}
                  currentMenu={currentMenu}
                  searchParams={searchParams}
                />
                <Table {...tableProps} />
              </TableSearch>
            ) : (
              <div className={styles.emptyBox}>
                <Spin tip="Loading..." size="large" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
export default TableList;
