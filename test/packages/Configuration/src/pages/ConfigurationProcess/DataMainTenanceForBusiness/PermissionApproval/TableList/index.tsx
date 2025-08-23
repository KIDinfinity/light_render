import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TableSearch, { Table } from '@/components/TableSearch';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { getColumns } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import { getDataFieldList } from 'configuration/pages/NavigatorConfiguration/Utils/getFormatField';
import ResizableColumns from './Resizable';
import styles from './index.less';


function TableList(props: any) {
  const [TableSearchRef, setTableSearchRef] = useState(null);
  const dispatch: Dispatch = useDispatch();
  const functionData = useSelector((state: any) => state.permissionConfigurationController.functionData);
  const listPage = useSelector((state: any) => state.permissionConfigurationController.listPage);
  const isAdd = useSelector((state: any) => state.permissionConfigurationController?.isAdd);
  const tableLoading = useSelector((state: any) => state.loading.effects['permissionConfigurationController/listPage']);
  const { searchDefault,extraColumns = [] } = props;
  const { dataFieldList, defaultSort } = functionData;
  const { rows = [], ...pagination } = listPage;

  const onSearch = async (values: any = {}, isAutoSearch: any) => {
    if (!functionData.id || (functionData && isAutoSearch && !lodash.isEmpty(listPage))) {
      return;
    }
    await dispatch({
      type: `permissionConfigurationController/${isAdd && !lodash.isEmpty(listPage) ? 'updateListPage' : 'listPage'
        }`,
      payload: {
        ...values,
        TableSearch:TableSearchRef,
      },
    });
  };

  const handleResize = async () => async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getFieldColumns = () => {
    let fieldColumns: any =
      getColumns({
        dataFieldList: getDataFieldList(dataFieldList),
        columnsFilter: {},
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
      title: formatMessageApi({ Label_BIZ_Claim: 'configuration.label.operation' }),
      width: 80,
      render: (el: any, record: any) => lodash.toUpper(record['#operation']),
    });
    return lodash.map(fieldColumns, (col: any) => {
      return {
        ...col,
        onHeaderCell: (column: any) => ({
          width: column.width,
          onResize: handleResize(),
        }),
      };
    });
  };

  const columns = getFieldColumns();
  const tableProps = {
    rowKey: 'cc_key',
    selectable: false, // isSelectable(operationList),
    columns,
    scroll: { x: 'max-content' },
    loading: tableLoading,
    sortMore: true,
    components: {
      header: {
        cell: ResizableColumns,
      },
    },
    data: {
      list: rows || [],
      pagination: {
        page: pagination.currentPage,
        ...pagination,
      },
    },
    getSelectedRowClassName: (record: any) => {
      return record.isDuplicate ? styles.isDuplicate : '';
    },
    onRow: (record: any, rowKey: any) => ({
      index: rowKey,
      record,
      sourcetype: 3,
      onClick: () => { },
    }),
  };

  useEffect(() => {
    if (TableSearchRef) {
      dispatch({
        type: 'dataConfigurationController/saveTableSearch',
        payload: {
          TableSearch:TableSearchRef,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (TableSearchRef) {
      TableSearchRef.setSelectedRows?.([]);
      TableSearchRef.setStateOfSearch({
        params: {},
      });
    }
  }, [functionData.id,TableSearchRef])
  return (
    <div>
      <TableSearch
        // @ts-ignore
        onSearch={onSearch}
        searchDefault={searchDefault}
        wrappedComponentRef={(c: any) => {
          setTableSearchRef(c)
        }}
      >
        <></>
        <></>
        {/**
           //@ts-ignore */}
        <Table {...tableProps} />
      </TableSearch>
    </div>
  );

}
export default TableList;
