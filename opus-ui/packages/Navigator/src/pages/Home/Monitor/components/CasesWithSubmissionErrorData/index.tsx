import React, { useEffect, useState } from 'react';
import { Form, Button, Table, notification, Icon } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './Columns';
import { getErrorIntegrationProcess } from '@/services/integrationProcessControllerService';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { MonitorItemCode } from '../../enum';
import { copy, filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import classnames from 'classnames';
import { Commonbox } from '../index';

function IntegrationError({ form, isExpand }) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const [caseJson, setCaseJson] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [canRetry, setCanRetry] = useState(false);

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const copyJson = async (integrationSessionId, type) => {
    setCopyLoading(true);
    if (caseJson[integrationSessionId]) {
      copy(caseJson?.[integrationSessionId]?.[type]);
      setCopyLoading(false);
      return;
    }
    const response = await getErrorIntegrationProcess({ integrationSessionId });
    if (response && response.success) {
      setCaseJson((item) => ({
        ...item,
        [integrationSessionId]: {
          requestData: response.resultData?.requestData || '{}',
          responseData: response.resultData?.responseData || '{}',
        },
      }));
      copy(response.resultData?.[type] || '{}');
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setCopyLoading(false);
  };

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
  }) => {
    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    let newParams = form.getFieldsValue();

    if (params) {
      newParams = params;
    }

    if (!params) {
      setPagination((item) => {
        return { ...item, page: 1 };
      });
      setSearchForm(newParams);
    }

    setSearchLoading(true);

    if (!lodash.isEmpty(newParams?.requestTime)) {
      newParams.requestTimeFrom = moment(newParams?.requestTime[0]).format('YYYY/MM/DD');
      newParams.requestTimeTo = moment(newParams?.requestTime[1]).format('YYYY/MM/DD');
      delete newParams.requestTime;
    }

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_cases_with_submission_error_data, {
        params: filterEmptyValue(newParams),
        currentPage,
        pageSize,
      })
    );

    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      setList(lodash.uniqBy(parseData?.rows || [], 'integrationSessionId'));
      setCanRetry(true);
      setPagination((item) => {
        return { ...item, total: parseData?.total, page: currentPage };
      });
      setSelectedRow([]);
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const retryHandle = async () => {
    setRetryLoading(true);
    const params = {
      integrationIds: selectedRow,
    };
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_retry_cases_with_submission_error_data, {
        params,
      })
    );
    if (response && response.success) {
      notification.success({ message: 'Success!' });
    }
    setSelectedRow([]);
    searchHandle({});
    setRetryLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => {
        return { ...item, page: changePage, pageSize: changePageSize };
      });
    else
      setPagination((item) => {
        return { ...item, page: changePage };
      });

    searchHandle({ currentPage: changePage, pageSize: changePageSize, params: searchForm });
  };

  useEffect(() => {
    searchHandle({ params: searchForm });
  }, [isExpand]);

  return (
    <Commonbox title={formatMessageApi({ Label_COM_MonitorCenter: 'CasesWithSubmissionErrorData' })}>
      <div className={styles.searchBox}>
        <div className={styles.inputField}>
          <FormItemInput
            form={form}
            formName="policyIds"
            labelId="PolicyNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
        </div>
        <div className={styles.buttonBox}>
          <Button
            type="primary"
            block
            className={styles.button}
            onClick={searchHandle}
            loading={searchLoading || retryLoading}
          >
            {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
          </Button>
          <div style={{ display: 'flex' }}>
            <Button
              loading={searchLoading || retryLoading}
              onClick={retryHandle}
              disabled={lodash.isEmpty(selectedRow) || !canRetry}
            >
              {!(searchLoading || retryLoading) && <Icon component={RetryIcon} />}
              <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Retry' })}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
        <Table
          rowKey={(row) => row.integrationSessionId}
          rowClassName={(row) => {
            if (lodash.isEmpty(row?.integrationSessionId)) {
              return 'selectionHidden';
            }
            return '';
          }}
          columns={Columns({ handleHeaderCell: () => {}, copyJson, copyLoading })}
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
            size: 'small',
            hideOnSinglePage: true,
          }}
          rowSelection={{
            selectedRowKeys: selectedRow,
            onSelect: (record, selected) => {
              if (selected) {
                setSelectedRow([...selectedRow, record.integrationSessionId]);
              } else {
                setSelectedRow(selectedRow.filter((item) => item !== record.integrationSessionId));
              }
            },
            onSelectAll: (selected, selectedRows) => {
              if (selected) {
                setSelectedRow(selectedRows.map((item) => item.integrationSessionId));
              } else {
                setSelectedRow([]);
              }
            },
          }}
        />
      </div>
    </Commonbox>
  );
}
export default Form.create()(IntegrationError);
