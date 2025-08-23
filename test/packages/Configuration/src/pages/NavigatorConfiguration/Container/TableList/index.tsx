import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Spin } from 'antd';
import TableSearch, { Table } from '@/components/TableSearch';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import { getColumns } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import type {
  CurrentMenuProps,
  FunctionDataProps,
} from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import Ellipsis from '@/components/Ellipsis';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import OperationBtn from './OperationBtn';
import { getDataFieldList } from '../../Utils/getFormatField';
import { getStatus } from '../../Utils';

interface ComponentProps {
  title: string;
  extraColumns?: any[];
  filterMap: any;
  setTableSearch: any;
}

function TableList(props: ComponentProps) {
  const [TableSearchRef, setTableSearchRef] = useState(null);
  const dispatch: Dispatch = useDispatch();
  const functionData: FunctionDataProps = useSelector(
    (state: any) => state.configurationController.functionData
  );
  const listPage: any = useSelector((state: any) => state.configurationController.listPage);
  const currentMenu: CurrentMenuProps = useSelector(
    (state: any) => state.configurationController.currentMenu
  );
  const searchDefault: any = useSelector(
    (state: any) => state.configurationController.searchDefault
  );
  const searchParams: any = useSelector((state: any) => state.configurationController.searchParams);
  const tableLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/listPage']
  );
  const functionLoading: boolean = useSelector(
    (state: any) => state.loading.effects['configurationController/getFunction']
  );
  const mentorDropdownList =
    useSelector((state: any) => state.configureUserController?.mentorDropdownList) || [];

  const { filterMap = {}, extraColumns = [], setTableSearch } = props;
  const functionCode = lodash.get(currentMenu, 'functionCode');
  const columnsFilter = lodash.get(filterMap, functionCode) || {};
  const { dataFieldList, defaultSort } = functionData || {};
  const { rows = [], ...pagination } = listPage;
  const menuId = lodash.get(currentMenu, 'id');

  const onSearch = async (values = {}) => {
    if (!functionData.id) {
      return;
    }
    await dispatch({
      type: 'configurationController/listPage',
      payload: {
        ...values,
      },
    });
  };

  const handleResize = (column: any) => async (e: any, { size }: any) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch({
      type: 'dataConfigurationController/resizeCellWidth',
      payload: {
        fieldName: column.key,
        width: size.width,
      },
    });
  };

  const getFieldColumns = () => {
    let fieldColumns: any =
      getColumns({
        dataFieldList: getDataFieldList(dataFieldList),
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
    fieldColumns.unshift({
      title: '',
      width: 40,
      render: (el: any, record: any) => getStatus(record),
    });
    return lodash.map(fieldColumns, (col: any) => {
      const componentType = lodash
        .chain(dataFieldList)
        .find((el) => el.fieldName === col.key)
        .get('componentType')
        .value();
      1;
      let extra = /text/.test(componentType)
        ? {
            render: (text: any) => {
              return (
                // @ts-ignore
                <Ellipsis tooltip lines={3}>
                  {text}
                </Ellipsis>
              );
            },
          }
        : {};
      if (col.dataIndex === 'account_status') {
        extra = {
          render: (text: any) => {
            return (
              // @ts-ignore
              <Ellipsis tooltip lines={3}>
                {formatMessageApi({
                  Dropdown_CFG_UserStatus: lodash.toString(text),
                })}
              </Ellipsis>
            );
          },
        };
      }
      return {
        ...col,
        onHeaderCell: (column: any) => ({
          width: column.width,
          // onResize: handleResize(column),
        }),
        ...extra,
      };
    });
  };

  const onPreviewRecord = async (record: any) => {
    dispatch({
      type: 'configurationController/setPreview',
      payload: {
        record,
        functionCode: functionData?.functionCode,
      },
    });
  };

  const isSelectable = useMemo(() => {
    const operationList = lodash.get(functionData, 'operationList');
    const selectArrs = ['update'];
    return lodash.some(operationList, (item) => lodash.includes(selectArrs, item));
  }, [functionData]);

  const columns = getFieldColumns();

  const newRows = lodash.map(rows, (row) => {
    const rowData = lodash.find(mentorDropdownList, { mentor: row.mentor });
    return { ...row, mentor: rowData?.user_name };
  });

  const tableProps = {
    rowKey: 'cc_key', // (r: any, i: number) => uuidv5(`${JSON.stringify(r)}-${i}`, uuidv5.URL),
    selectable: isSelectable,
    columns,
    scroll: {
      x: 'max-content',
      y: 'calc(100vh - 360px)',
      scrollToFirstRowOnChange: true,
    },
    loading: tableLoading,
    sortMore: true,
    data: {
      list: newRows || [],
      pagination: {
        page: pagination.currentPage,
        ...pagination,
      },
    },
    getCheckboxProps: ({ cc_latest_status }: any) => ({
      disabled: !!cc_latest_status,
    }),
    onRow: (record: any, rowKey: any) => ({
      index: rowKey,
      record,
      sourcetype: 3,
      onClick: () => {
        onPreviewRecord(record);
      },
    }),
  };

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
        {menuId && (
          <>
            {!functionLoading ? (
              // @ts-ignore
              <TableSearch
                // @ts-ignore
                onSearch={onSearch}
                searchDefault={searchDefault}
                wrappedComponentRef={(c: any) => {
                  setTableSearchRef(c);
                  setTableSearch(c);
                }}
              >
                <></>
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
