import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Spin, Switch } from 'antd';
import { useLocation } from 'umi';
import type { Dispatch } from 'redux';
import Empty from '@/components/Empty';
import DnDHeader from '@/components/DnDCard/DnDHeader';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TableSearch, { Table } from '@/components/TableSearch';
import { getColumns as getFormColumns } from 'configuration/pages/ConfigurationCenter/Utils/FormUtils';
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

const MainCtn: React.FC<IProps> = (props) => {
  const {
    dispatch,
    activeTabKey,
    reportMetadataLoding,
    tableDataLoding,
    reportMetadata,
    tableReport,
    searchDefault,
    collapseState,
    clickdTab,
  } = props;
  const { state: locationState } = useLocation();

  // 用 useRef 保存组件根 DOM 引用
  const tableEleRef = useRef<HTMLDivElement | null>(null);
  // 保存表格可滚动区域的高度，此值由组件挂载时及窗口变化时计算得到
  const [tableHeight, setTableHeight] = useState<number | null>(null);

  // 计算表格区域高度
  const countTableHeight = useCallback(() => {
    if (tableEleRef.current && tableEleRef.current.clientHeight) {
      setTableHeight(
        collapseState
          ? tableEleRef.current.clientHeight - 296 - 140 // 例如：减去 Statistic 组件对应的高度
          : tableEleRef.current.clientHeight - 106 - 140
      );
    }
  }, [collapseState]);

  // 挂载后及窗口变化时重新计算高度
  useEffect(() => {
    countTableHeight();
    window.addEventListener('resize', countTableHeight);
    return () => window.removeEventListener('resize', countTableHeight);
  }, [countTableHeight]);

  // 当 collapseState 改变时，重新计算表格高度
  useEffect(() => {
    countTableHeight();
  }, [collapseState, countTableHeight]);

  // 定义排序回调函数
  const onSort = useCallback(
    (columnFieldList: any[]) => {
      dispatch({
        type: 'reportCenterController/saveColumnFieldList',
        payload: { reportCode: activeTabKey, columnFieldList },
      });
    },
    [dispatch, activeTabKey]
  );

  // 删除列的回调函数
  const onRemove = useCallback(
    ({ id }: any) => {
      const columnFieldList = lodash.get(reportMetadata, `${activeTabKey}.columnFieldList`);
      dispatch({
        type: 'reportCenterController/saveColumnFieldList',
        payload: {
          reportCode: activeTabKey,
          columnFieldList: lodash.map(columnFieldList, (item: any) =>
            item?.id === id ? { ...item, visible: false } : item
          ),
        },
      });
    },
    [dispatch, reportMetadata, activeTabKey]
  );

  // 通过 useMemo 计算表格列配置
  const columns = useMemo(() => {
    const columnFieldList = lodash.get(reportMetadata, `${activeTabKey}.columnFieldList`);
    const dictionary = lodash.get(reportMetadata, `${activeTabKey}.dictionary`);
    const fieldColumns: any =
      getFormColumns(
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
          onSort,
          onRemove,
        }),
        ...extraRender,
      };
    });
  }, [reportMetadata, activeTabKey, onSort, onRemove]);

  // 生成 Table 组件的 props
  const tableProps = useMemo(() => {
    const { rows = [], ...pagination } = tableReport;
    return {
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
  }, [tableReport, tableDataLoding, columns, tableHeight]);

  // 定义查询回调函数
  const onSearch = useCallback(
    async (values = {}) => {
      const { fromDashboard: isFromDashboard, dashboardCode } = locationState || {};
      // 如果当前页签报告元数据不存在或设置了缓存，则不调用接口
      if (!reportMetadata[activeTabKey] || !!reportMetadata?.[activeTabKey]?.resultCacheDuration) {
        return;
      }
      // 如果默认查询条件均为空且点击了标签，则清空数据后不调用接口
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
      dispatch({
        type: 'reportCenterController/batchSumUpStatistic',
        payload: { isFromDashboard, dashboardCode },
      });
      const result: any = await dispatch({
        type: 'reportCenterController/getReport',
        payload: { ...values, isFromDashboard },
      });
      if (result && result.response.resultData.total > 0) {
        tarckInquiryPoint(dispatch, {
          eventName:
            result.reportName ||
            formatMessageApi({
              Label_COM_ReportCenter: result.reportParams?.reportCode,
            }),
          eventOperation: eEventOperation.preView,
          remarks: result.reportParams?.whereConditions,
        });
      }
    },
    [activeTabKey, reportMetadata, searchDefault, clickdTab, locationState, dispatch]
  );

  // 改变表格展示开关
  const changeTableSwitch = useCallback(
    (checked: boolean) => {
      dispatch({
        type: 'reportCenterController/changeTableSwitch',
        payload: { isPrintTable: checked },
      });
    },
    [dispatch]
  );

  return (
    <div className={styles.mainCtn} ref={tableEleRef}>
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
                      onChange={changeTableSwitch}
                    />
                  </div>
                  <SearchFilter reportCode={activeTabKey} />
                </div>
                <TableSearch onSearch={onSearch} searchDefault={searchDefault?.[activeTabKey]}>
                  <>{/* 此处保留空节点或可按需填充其他内容 */}</>
                  <>{/* 此处保留空节点或可按需填充其他内容 */}</>
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
};

export default connect(({ reportCenterController, loading }: any) => ({
  tableReport: reportCenterController.tableReport,
  activeTabKey: reportCenterController.activeTabKey,
  tableDataLoding: loading.effects['reportCenterController/getReport'],
  reportMetadataLoding: loading.effects['reportCenterController/findReportMetadata'],
  reportMetadata: reportCenterController.reportMetadata,
  searchDefault: reportCenterController.searchDefault,
  collapseState: reportCenterController.collapseState,
  clickdTab: reportCenterController.clickdTab,
}))(MainCtn);
