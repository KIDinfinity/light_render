import React, { useEffect, useState } from 'react';
import { Form, Button, Table, notification, Icon } from 'antd';
import { FormItemInput, FormItemDateRangePicker } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './RetryResultColumns';
import lodash from 'lodash';
import moment from 'moment';
import { filterEmptyValue, monitorParams } from '../../utils';
import { MonitorItemCode } from '../../enum';
import { safeParseUtil } from '@/utils/utils';
import { centerRequest } from '@/services/monitorCenterControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import classnames from 'classnames';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';

function RetryResult({ form, commonBatchNo, isExpand, exportExcel }) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [exportLoading, setExportLoading] = useState(false)

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
  }) => {
    let newParams = form.getFieldsValue();

    if (params) {
      newParams = params;
    }

    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    if (
      lodash
        .chain(newParams)
        .values()
        .every((item) => lodash.isEmpty(item))
        .value()
    ) {
      notification.error({ message: 'not empty!' });
      return;
    }

    setSearchLoading(true);
    if (!params) {
      setPagination((item) => ({ ...item, page: 1 }));
      setSearchForm(newParams);
    } else {
      newParams = params;
    }
    if (!lodash.isEmpty(newParams?.requestTime)) {
      newParams.requestTimeFrom = moment(newParams?.requestTime[0]).format('YYYY/MM/DD');
      newParams.requestTimeTo = moment(newParams?.requestTime[1]).format('YYYY/MM/DD');
      delete newParams.requestTime;
    }

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_query_batch_retry_integration_exception_case_log, {
        params: filterEmptyValue(newParams),
        currentPage,
        pageSize,
      })
    );
    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      setList(parseData?.rows || []);
      setPagination((item) => {
        return { ...item, total: parseData?.total, page: currentPage }
      });
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => {
        return { ...item, page: changePage, pageSize: changePageSize }
      });
    else setPagination((item) => {
      return { ...item, page: changePage }
    });

    searchHandle({ currentPage: changePage, pageSize: changePageSize, params: searchForm });
  };

  useEffect(() => {
    if (!lodash.isEmpty(commonBatchNo)) {
      form.resetFields();
      form.setFieldsValue({ batchNo: commonBatchNo });
      searchHandle({});
    }
  }, [commonBatchNo]);

  useEffect(() => {
    if (list && list.length) searchHandle({ params: searchForm });
  }, [isExpand]);

  const onExport = () => {
    const newParams = form.getFieldsValue();
    if (
      lodash
        .chain(newParams)
        .values()
        .every((item) => lodash.isEmpty(item))
        .value()
    ) {
      notification.error({ message: 'not empty!' });
      return;
    }

    if (!lodash.isEmpty(newParams?.requestTime)) {
      newParams.requestTimeFrom = moment(newParams?.requestTime[0]).format('YYYY/MM/DD');
      newParams.requestTimeTo = moment(newParams?.requestTime[1]).format('YYYY/MM/DD');
      delete newParams.requestTime;
    }

    exportExcel(
      monitorParams(MonitorItemCode.tools_query_batch_retry_integration_exception_case_log, {
        params: filterEmptyValue(newParams),
        currentPage: 1,
        pageSize: 1000,
      }), setExportLoading
    )
  }

  return (
    <div className={styles.retryResultBox}>
      <div className={styles.subTitle}>{formatMessageApi({ Label_COM_MonitorCenter: 'RetryResult' })}</div>
      <div className={styles.searchBox}>
        <div className={styles.fieldBox}>
          <FormItemInput
            form={form}
            formName="batchNo"
            labelId="BatchNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
          <FormItemDateRangePicker
            form={form}
            labelId="RequestTime"
            labelTypeCode="Label_COM_MonitorCenter"
            formName="requestTime"
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
            <Button loading={exportLoading} onClick={onExport}>
              {!exportLoading && <Icon component={exportSvg} />}
              <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Export' })}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
        <Table
          columns={Columns()}
          dataSource={list || []}
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
    </div>
  );
}
export default Form.create()(RetryResult);
