import type { TableProps } from 'antd/lib/table';
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import lodash, { isFunction, isEqual, pick } from 'lodash';
import { getColumns } from './Columns';
import SortMachine from './Machine/SortMachine';
import { defaultReqVal } from '../TableSearch/transfer';
import styles from './index.less';
import Empty from '../Empty';

interface DataProps {
  list: any[];
  pagination: any;
}

interface IProps extends TableProps<{}> {
  data: DataProps;
  loading: boolean;
  columns: any[];
  rowKey: any;
  searchDefault?: any;
  sortMore?: boolean;
  setSelectedRows?: Function;
  stateOfSearch?: any;
  selectedRows?: any;
  onSelectRow?: any;
  selectable?: boolean;
  handleSearch?: Function;
  setStateOfSearch?: Function;
  getSelectedRowClassName?: any;
  onChange?: any;
  setSortOrders?: Function;
  getStoredTable?: Function;
  sortOrders?: SortProps[];
  getCheckboxProps: any;
}

interface SortProps {
  sortName: string;
  sortOrder: string;
}

interface IState {
  selectedRowKeys: any[];
  needTotalList: any[];
}

function initTotalList(columns: any) {
  const totalList: any[] = [];
  columns.forEach((column: any) => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });

  return totalList;
}

class StandardTable extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { columns, searchDefault, setSortOrders } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
    const sortOrders = lodash.get(searchDefault, 'sortOrders');
    if (lodash.isFunction(setSortOrders)) {
      setSortOrders(sortOrders);
    }
  }

  static getDerivedStateFromProps(nextProps: IProps) {
    const { selectedRows, rowKey, columns } = nextProps;
    // clean state
    if (nextProps && selectedRows && selectedRows?.length === 0) {
      const needTotalList = initTotalList(columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    if (lodash.isFunction(rowKey)) {
      return null;
    }
    return {
      selectedRowKeys: selectedRows?.map((item: any) => item[rowKey]),
    };
  }

  get columns() {
    const { columns = [], sortMore = false, sortOrders = [] } = this.props;
    if (!sortMore) {
      return columns;
    }
    return getColumns({
      columns,
      sortMore,
      sortOrders,
    });
  }

  get paginationProps() {
    const {
      data: { pagination = {} },
      searchDefault,
    } = this.props;
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      current: pagination.page || lodash.get(searchDefault, 'pagination.page'), // ant-table组件，接收current参数
      pageSize: pagination.pageSize || lodash.get(searchDefault, 'pagination.pageSize'),
      total: pagination.total,
    };
  }

  handleRowSelectChange = (selectedRowKeys: string[], selectedRows: any[]) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map((item) => ({
      ...item,
      // @ts-ignore
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys, needTotalList });
    const { setSelectedRows } = this.props; // 用于TableList
    if (setSelectedRows) {
      setSelectedRows(selectedRows, selectedRowKeys); // 用于TableList
    }
  };

  getSortOrders = ({ field: sortName }: any) => {
    const { sortOrders = [], setSortOrders } = this.props;

    const currentOrder = lodash
      .chain(sortOrders)
      .find((el) => el.sortName === sortName)
      .get('sortOrder')
      .value();

    const next = SortMachine.transition(currentOrder || 'undefined', 'NEXT').value;
    const nextOrder = next === 'undefined' ? '' : String(next);
    let sortOrdersTemp: any = lodash.cloneDeep(sortOrders);
    if (!currentOrder) {
      sortOrdersTemp.push({
        sortName,
        sortOrder: nextOrder,
      });
    } else if (nextOrder) {
      sortOrdersTemp = sortOrdersTemp.map((item: any) => {
        if (item.sortName === sortName) {
          lodash.set(item, 'sortOrder', nextOrder);
        }
        return item;
      });
    } else if (!nextOrder) {
      sortOrdersTemp = lodash.filter(sortOrdersTemp, (el) => el.sortName !== sortName);
    }

    if (lodash.isFunction(setSortOrders)) {
      setSortOrders(sortOrdersTemp);
    }
    return sortOrdersTemp;
  };

  handleTableChange = async (pagination: any, filters: any, sorter: any) => {
    const {
      stateOfSearch,
      searchDefault = defaultReqVal,
      handleSearch,
      onChange,
      sortOrders,
      sortMore,
    } = this.props; // tablelist

    const paginationProps = pick(this.paginationProps, ['current', 'pageSize']);
    const curPagination = pick(pagination, ['current', 'pageSize']);

    const { field, order } = sorter;
    const sorts: any =
      sortMore && isEqual(curPagination, paginationProps) ? this.getSortOrders(sorter) : null;
    // 处理筛选
    const getValue = (obj: any) =>
      Object.keys(obj)
        .map((key) => obj[key])
        .join(','); // tablelist
    // tablelist
    const filtersArg = Object.keys(filters).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filters[key]) || lodash.get(searchDefault, `params[${key}]`);

      return newObj;
    }, {});
    const stateParams = lodash.get(stateOfSearch, 'params') || {};

    // tablelist
    const params: any = {
      params: {
        ...stateParams, // tablelist 上次状态
        ...filtersArg, // tablelist table上的过滤信息
      },
      pagination: {
        total: pagination.total,
        page: pagination.current, // tablelist 分页 解耦
        pageSize: pagination.pageSize, // tablelist 分页 解耦
      },
      sortName: field || '',
      sortOrder: order === 'ascend' ? 'asc' : 'desc',
      sortOrders: sorts || sortOrders,
    };

    if (field && !!order) {
      params.orders = {
        [field]: {
          sortName: field,
          sortOrder: order,
        },
      };
    } else {
      params.orders = {};
      // 添加下面两行是为了解决默认排序失效(by:jack_huang)
      params.sortOrder = '';
      params.sortName = '';
    }

    if (typeof onChange === 'function') {
      await onChange(pagination, filters, sorter, this.props, params); // tablelist
    }

    if (typeof handleSearch === 'function') {
      handleSearch(null, params); // tablelist
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys } = this.state;

    const {
      data: { list = [] } = {},
      loading,
      rowKey,
      searchDefault,
      selectable,
      onRow,
      sortMore,
      getSelectedRowClassName,
      getStoredTable,
      getCheckboxProps,
      locale,
      ...props
    } = this.props;

    const rowSelection: any = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: lodash.isFunction(getCheckboxProps)
        ? getCheckboxProps
        : (record: any) => ({
            disabled: record.disabled,
          }),
    };

    const defaultLocale = {
      emptyText: <Empty />,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          className={`${sortMore && styles.sortMore}`}
          locale={locale || defaultLocale}
          {...props}
          loading={loading}
          rowKey={rowKey || 'key'}
          rowSelection={selectable ? rowSelection : null}
          rowClassName={getSelectedRowClassName}
          dataSource={list || []}
          columns={this.columns}
          pagination={this.paginationProps}
          onChange={this.handleTableChange}
          ref={(ref) => {
            if (isFunction(getStoredTable)) getStoredTable(ref);
          }}
          onRow={onRow}
        />
      </div>
    );
  }
}

export default StandardTable;
