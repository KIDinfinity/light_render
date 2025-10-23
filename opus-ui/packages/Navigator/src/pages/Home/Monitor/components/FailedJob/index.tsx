import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Icon } from 'antd';
import { FormItemInput, FormItemDateRangePicker } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './Columns';
import { filterEmptyValue, monitorParams } from '../../utils';
import { MonitorItemCode } from '../../enum';
import { safeParseUtil } from '@/utils/utils';
import { centerRequest } from '@/services/monitorCenterControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import { Commonbox } from '../index';
import lodash from 'lodash';
import moment from 'moment';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg'
import classnames from 'classnames';

function FailedJob({ form, isExpand, setExpand, exportExcel }) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false)
  const [searchForm, setSearchForm] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [sortObj, setSortObj] = useState({ sortName: 'start_time', sortOrder: 'desc' });

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
  }) => {
    let newParams = form.getFieldsValue();

    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    setSearchLoading(true);
    if (!params) {
      setPagination((item) => ({ ...item, page: 1 }));
      setSearchForm(newParams);
    } else {
      newParams = params;
    }

    if (!lodash.isEmpty(newParams?.executeDate)) {
      newParams.startTimeFrom = moment(newParams?.executeDate[0]).format('YYYY/MM/DD');
      newParams.startTimeTo = moment(newParams?.executeDate[1]).format('YYYY/MM/DD');
      delete newParams.executeDate;
    }
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_query_daemon_operation_fail_log, {
        params: filterEmptyValue({ ...newParams, ...sortObj }),
        currentPage,
        pageSize,
      })
    );
    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      const rows = lodash.map(parseData?.rows, (item, index) => ({
        ...item,
        key: item?.id || index,
      }));
      setList(rows);
      setPagination((item) => ({ ...item, total: parseData?.total, page: currentPage }));
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const handleHeaderCell = (column) => {
    const selectSortName = lodash.snakeCase(column.key);
    const newSortObj = sortObj;
    if (selectSortName === sortObj.sortName) {
      switch (sortObj.sortOrder) {
        case undefined:
          newSortObj.sortOrder = 'asc';
          break;
        case 'asc':
          newSortObj.sortOrder = 'desc';
          break;
        case 'desc':
          newSortObj.sortName = null;
          newSortObj.sortOrder = null;
          break;
      }
    } else {
      newSortObj.sortName = selectSortName;
      newSortObj.sortOrder = 'asc';
    }
    setSortObj(newSortObj);
    searchHandle({ params: { ...searchForm, ...newSortObj } });
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));
    searchHandle({ currentPage: changePage, pageSize: changePageSize, params: searchForm });
  };

  useEffect(() => {
    searchHandle({});
  }, [isExpand]);

  const onExport = () => {
    const newParams = form.getFieldsValue();
    if (!lodash.isEmpty(newParams?.executeDate)) {
      newParams.startTimeFrom = moment(newParams?.executeDate[0]).format('YYYY/MM/DD');
      newParams.startTimeTo = moment(newParams?.executeDate[1]).format('YYYY/MM/DD');
      delete newParams.executeDate;
    }
    exportExcel(
      monitorParams(MonitorItemCode.tools_query_daemon_operation_fail_log, {
        params: filterEmptyValue({ ...newParams, ...sortObj }),
        currentPage: 1,
        pageSize: 1000,
      }), setExportLoading
    )
  }

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'FailedJob' })}
      click={() => setExpand(!isExpand)}
    >
      <div className={styles.searchBox}>
        <div className={styles.inputField}>
          <FormItemInput
            form={form}
            formName="caseNo"
            labelId="CaseNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
          <FormItemInput
            form={form}
            formName="businessNo"
            labelId="BusinessNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
          <FormItemDateRangePicker
            form={form}
            labelId="ExecuteDate"
            labelTypeCode="Label_COM_MonitorCenter"
            formName="executeDate"
            // formItemLayout={{ style: { width: '100%' } }}
          />
        </div>
        <div className={styles.buttonBox}>
          <Button
            type="primary"
            block
            className={styles.button}
            onClick={searchHandle}
            loading={searchLoading}
          >
            {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
          </Button>
          <div style={{display: 'flex'}}>
            <Button loading={searchLoading} onClick={searchHandle}>
              {!searchLoading && <Icon component={RetryIcon} />}
              <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Retry' })}</span>
            </Button>
            <Button
              loading={exportLoading}
              onClick={onExport}>
              {!exportLoading && <Icon component={exportSvg} />}
              <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Export' })}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
        <Table
          columns={Columns({ handleHeaderCell })}
          dataSource={list.slice(0, actualPageSize) || []}
          loading={searchLoading}
          scroll={{ x: true }}
          style={{ whiteSpace: 'nowrap' }}
          pagination={{
            pageSize: actualPageSize,
            total: pagination?.total,
            current: pagination.page,
            showSizeChanger: true,
            onChange: pageChangeHandle,
            onShowSizeChange: pageChangeHandle,
            hideOnSinglePage: true,
            size: 'small',
          }}
        />
      </div>
    </Commonbox>
  );
}
export default Form.create()(FailedJob);
