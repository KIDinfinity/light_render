import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin } from 'opus/Components/Antd';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import Empty from '@/components/Empty';
import DnDHeader from '@/components/DnDCard/DnDHeader';
import TableSearch, { Table } from '@/components/TableSearch';
import { getColumns } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import { getDataFieldList } from '../_utils/getFormatField';
import styles from './index.less';
import getRender from '../_utils/getRender';

interface IProps {
  dispatch: Dispatch;
  activeTabKey: string;
  reportMetadataLoding: boolean;
  tableDataLoding: boolean;
  reportMetadata: any;
  tableReport: any;
  searchDefault: any;
  collapseState: boolean;
}

// @ts-ignore
@connect(({ reportCenterController, loading }) => ({
  tableReport: reportCenterController.tableReport,
  activeTabKey: reportCenterController.activeTabKey,
  tableDataLoding: loading.effects['reportCenterController/getReport'],
  reportMetadataLoding: loading.effects['reportCenterController/findReportMetadata'],
  reportMetadata: reportCenterController.reportMetadata,
  searchDefault: reportCenterController.searchDefault,
  collapseState: reportCenterController.collapseState,
}))
class MainCtn extends Component<IProps> {
  tableEle: any = null;
  statisticEle: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      tableEle: null,
      statisticEle: null,
    };
  }

  get getColumns() {
    const { reportMetadata, activeTabKey } = this.props;
    const columnFieldList = lodash.get(reportMetadata, `${activeTabKey}.columnFieldList`);
    const dictionary = lodash.get(reportMetadata, `${activeTabKey}.dictionary`);
    const fieldColumns: any =
      getColumns(
        {
          dataFieldList: getDataFieldList(columnFieldList),
          columnsFilter: {},
          defaultSort: '',
        },
        { sort: 'fieldSequence', order: 'visible' }
      ) || [];
    return lodash.map(fieldColumns, (item) => {
      const target = lodash
        .chain(columnFieldList)
        .find((el) => el.fieldName === item.key)
        .value();
      const { componentType, fieldName, format, separator } =
        lodash
          .chain(columnFieldList)
          .find((el) => el.fieldName === item.key)
          .value() || {};

      const extraRender = getRender({
        componentType,
        fieldName,
        dictionary,
        format,
        separator,
      });

      return {
        ...item,
        onHeaderCell: (column: any) => ({
          width: column.width,
          record: target,
          sortKey: 'fieldSequence',
          array: columnFieldList,
          onSort: this.onSort,
          onRemove: this.onRemove,
          showBtn: false,
        }),
        ...extraRender,
      };
    });
  }

  onSort = (columnFieldList: any[]) => {
    const { dispatch, activeTabKey } = this.props;
    dispatch({
      type: 'reportCenterController/saveColumnFieldList',
      payload: {
        reportCode: activeTabKey,
        columnFieldList,
      },
    });
  };
  onRemove = ({ id }: any) => {
    const { dispatch, reportMetadata, activeTabKey } = this.props;
    const columnFieldList = lodash.get(reportMetadata, `${activeTabKey}.columnFieldList`);
    dispatch({
      type: 'reportCenterController/saveColumnFieldList',
      payload: {
        reportCode: activeTabKey,
        columnFieldList: lodash.map(columnFieldList, (item: any) =>
          item?.id === id
            ? {
                ...item,
                visible: false,
              }
            : item
        ),
      },
    });
  };

  tableProps = () => {
    const { tableDataLoding, tableReport, activeTabKey } = this.props;
    const { rows = [], ...pagination } = tableReport?.[activeTabKey] || {};
    const columns = this.getColumns;
    const tableProps = {
      rowKey: 'cc_key',
      columns,
      components: {
        header: {
          cell: DnDHeader,
        },
      },
      scroll: {
        x: 'max-content',
        // y: tableHeight,
        scrollToFirstRowOnChange: true,
      },
      loading: tableDataLoding,
      sortMore: false,
      data: {
        list: rows || [],
        pagination: {
          page: pagination.currentPage,
          ...pagination,
        },
      },
    };
    return tableProps;
  };

  onSearch = async (values = {}) => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'reportCenterController/getReport',
      payload: {
        ...values,
      },
    });
  };

  render() {
    const { activeTabKey, reportMetadataLoding, searchDefault } = this.props;
    const tableProps = this.tableProps();
    return (
      <div
        className={styles.mainCtn}
        ref={(ele: any) => {
          this.tableEle = ele;
        }}
      >
        {!activeTabKey ? (
          <div className="tip">
            <div className="tipText">
              <Empty />
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            {reportMetadataLoding ? (
              <Spin className={styles.emptyBox} />
            ) : (
              <>
                <div className={styles.table}>
                  <TableSearch
                    onSearch={(values: any, isAutoSearch: Booleam) => {
                      if (!isAutoSearch) {
                        this.onSearch(values);
                      }
                    }}
                    searchDefault={searchDefault?.[activeTabKey]}
                  >
                    <></>
                    <></>
                    <Table {...tableProps} />
                  </TableSearch>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MainCtn;
