import React, { Component } from 'react';
import { connect } from 'dva';
import { Spin, Switch } from 'antd';
import lodash from 'lodash';
import type { Dispatch } from 'redux';
import Empty from '@/components/Empty';
import DnDHeader from '@/components/DnDCard/DnDHeader';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TableSearch, { Table } from '@/components/TableSearch';
import { getColumns } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
import Statistic from '../Statistic';
import SearchFilter from './SearchFilter';
import { tarckInquiryPoint, eEventOperation } from '@/components/TarckPoint';
import { getDataFieldList } from '../_utils/getFormatField';
import styles from './index.less';
import getRender from '../_utils/getRender';
import isEmptyParams from '../_utils/isEmptyParams';

interface IProps {
  dispatch: Dispatch;
  activeTabKey: string;
  reportMetadataLoding: boolean;
  tableDataLoding: boolean;
  reportMetadata: any;
  tableReport: any;
  searchDefault: any;
  collapseState: boolean;
  clickdTab: boolean;
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
  clickdTab: reportCenterController.clickdTab,
}))
class MainCtn extends Component<IProps> {
  tableEle: any = null;
  statisticEle: any = null;
  constructor(props: any) {
    super(props);
    this.state = {
      tableEle: null,
      statisticEle: null,
      tableHeight: null,
    };
  }

  componentDidMount() {
    this.countTableHeight();
    window.addEventListener('resize', () => this.countTableHeight());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapseState !== this.props.collapseState) {
      this.countTableHeight();
    }
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

  countTableHeight = () => {
    const { collapseState } = this.props;
    if (this.tableEle && this.tableEle?.clientHeight) {
      this.setState({
        tableHeight: collapseState
          ? this.tableEle?.clientHeight - 296 - 140 //减去Statistic th的高度
          : this.tableEle?.clientHeight - 106 - 140,
      });
    }
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
    const { tableDataLoding, tableReport } = this.props;
    const { tableHeight } = this.state;
    const { rows = [], ...pagination } = tableReport;
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
        y: tableHeight,
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
    const { dispatch, activeTabKey, reportMetadata, searchDefault, clickdTab } = this.props;
    if (!reportMetadata[activeTabKey]) {
      return;
    }
    // 没有可见的默认值，不call接口
    if (
      isEmptyParams(
        reportMetadata?.[activeTabKey]?.searchFieldList,
        searchDefault?.[activeTabKey]
      ) &&
      clickdTab
    ) {
      await dispatch({
        type: 'reportCenterController/clearReport',
      });
      return;
    }
    const result: any = await dispatch({
      type: 'reportCenterController/getReport',
      payload: {
        ...values,
      },
    });
    dispatch({
      type: 'reportCenterController/batchSumUpStatistic',
    });
    if (result && result.response.resultData.total > 0) {
      tarckInquiryPoint(dispatch, {
        eventName:
          result.reportName ||
          formatMessageApi({ Label_COM_ReportCenter: result.reportParams?.reportCode }),
        eventOperation: eEventOperation.preView,
        remarks: result.reportParams?.whereConditions,
      });
    }
  };

  private changeTableSwitch = (checked) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportCenterController/changeTableSwitch',
      payload: { isPrintTable: checked },
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
                  <div className={styles.searchFilter}>
                    <div className={styles.switch}>
                      <Switch
                        checkedChildren={formatMessageApi({
                          Label_BPM_Button: 'Export_with_Details',
                        })}
                        unCheckedChildren={formatMessageApi({
                          Label_BPM_Button: 'Export_with_Details',
                        })}
                        defaultChecked
                        onChange={this.changeTableSwitch}
                      />
                    </div>
                    <SearchFilter reportCode={activeTabKey} />
                  </div>
                  <TableSearch
                    onSearch={this.onSearch}
                    searchDefault={searchDefault?.[activeTabKey]}
                  >
                    <></>
                    <></>
                    <Table {...tableProps} />
                  </TableSearch>
                </div>
                <Statistic />
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MainCtn;
