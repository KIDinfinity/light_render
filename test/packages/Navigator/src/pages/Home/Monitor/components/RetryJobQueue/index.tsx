import React, { useEffect, useState } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, Icon } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Columns from './Columns';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { MonitorItemCode } from '../../enum';
import { filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';
import classnames from 'classnames';

function RetryJobQueue({ form, isExpand, setExpand, exportExcel }) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
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

    if (!params) {
      setPagination((item) => ({ ...item, page: 1 }));
      setSearchForm(newParams);
    }

    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    setSearchLoading(true);

    if (!lodash.isEmpty(newParams?.requestTime)) {
      newParams.requestTimeFrom = moment(newParams?.requestTime[0]).format('YYYY/MM/DD');
      newParams.requestTimeTo = moment(newParams?.requestTime[1]).format('YYYY/MM/DD');
      delete newParams.requestTime;
    }

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_query_integration_batch_retry_case, {
        params: filterEmptyValue(newParams),
        currentPage,
        pageSize,
      })
    );

    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      setList(lodash.uniqBy(parseData?.rows || [], 'bizCaseNo'));
      setPagination((item) => ({ ...item, total: parseData?.total, page: currentPage }));
      setSelectedRow([]);
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const retryHandle = async () => {
    setRetryLoading(true);
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_batch_retry_integration_batch_retry_case, {
        params: {
          caseNos: selectedRow,
        },
      })
    );
    const parseResponse = safeParseUtil(response?.responseData?.responseData) || {};

    if (response && response.success && parseResponse?.success) {
      searchHandle({ params: form.getFieldsValue() });
    } else {
      handleMessageModal(response.messageList || parseResponse.promptMessages);
    }

    setRetryLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));

    searchHandle({ currentPage: changePage, pageSize: changePageSize, params: searchForm });
  };

  useEffect(() => {
    searchHandle({ params: searchForm });
  }, [isExpand]);

  const onExport = () => {
    const newParams = form.getFieldsValue();

    if (!lodash.isEmpty(newParams?.requestTime)) {
      newParams.requestTimeFrom = moment(newParams?.requestTime[0]).format('YYYY/MM/DD');
      newParams.requestTimeTo = moment(newParams?.requestTime[1]).format('YYYY/MM/DD');
      delete newParams.requestTime;
    }

    exportExcel(
      monitorParams(MonitorItemCode.tools_query_integration_batch_retry_case, {
        params: filterEmptyValue(newParams),
        currentPage: 1,
        pageSize: 1000,
      }), setExportLoading
    )
  }

  return (
    <div className={styles.integrationErrorBox}>
      <Commonbox
        title={formatMessageApi({ Label_COM_MonitorCenter: 'RetryProgressMonitor' })}
        click={() => setExpand(!isExpand)}
      >
        <div className={styles.activeIssusBox}>
          <div className={styles.searchBox}>
            <div className={styles.fieldBox}>
              <FormItemInput
                form={form}
                formName="bizCaseNo"
                labelId="CaseNo"
                labelTypeCode="Label_COM_MonitorCenter"
              />
              <FormItemInput
                form={form}
                formName="bizBusinessNo"
                labelId="BusinessNo"
                labelTypeCode="Label_COM_MonitorCenter"
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
                <Button
                  loading={searchLoading || retryLoading}
                  onClick={retryHandle}
                  disabled={lodash.isEmpty(selectedRow)}
                >
                  {!retryLoading && <Icon component={RetryIcon} />}
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
              rowKey={(row) => row.bizCaseNo}
              rowClassName={(row) => {
                // if (lodash.isEmpty(row?.exceptionCaseNo) || retryRow.includes(row.id)) {
                //   return 'selectionHidden';
                // }
                return '';
              }}
              columns={Columns()}
              dataSource={list || []}
              loading={searchLoading}
              scroll={{ x: true }}
              style={{ whiteSpace: 'nowrap' }}
              pagination={{
                pageSize: pagination.pageSize,
                total: pagination?.total,
                current: pagination.page,
                showSizeChanger: true,
                onChange: pageChangeHandle,
                onShowSizeChange: pageChangeHandle,
                hideOnSinglePage: true,
                size: 'small',
              }}
              rowSelection={{
                selectedRowKeys: selectedRow,
                onSelect: (record, selected) => {
                  if (selected) {
                    setSelectedRow([...selectedRow, record.bizCaseNo]);
                  } else {
                    setSelectedRow(selectedRow.filter((item) => item !== record.bizCaseNo));
                  }
                },
                onSelectAll: (selected, selectedRows) => {
                  if (selected) {
                    setSelectedRow(selectedRows.map((item) => item.bizCaseNo));
                  } else {
                    setSelectedRow([]);
                  }
                },
              }}
            />
          </div>
        </div>
      </Commonbox>
    </div>
  );
}

export default Form.create()(RetryJobQueue);
