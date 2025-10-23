import React, { useEffect, useState } from 'react';
import { Form, Button, Table, notification, Icon } from 'antd';
import { FormItemInput, FormItemDateRangePicker, FormItemSelect } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './ActiveIssueColumns';
import { listProcessAct } from '@/services/bpmProcessActivityService';
import { getAllIntegrationCode } from '@/services/integrationInfoControllerService';
import { getErrorIntegrationProcess } from '@/services/integrationProcessControllerService';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { MonitorItemCode } from '../../enum';
import { copy, filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { ReactComponent as forwardSVG } from 'navigator/assets/forward.svg';
import { ReactComponent as expandSVG } from 'navigator/assets/expand-search-box.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg'
import classnames from 'classnames';

function IntegrationError({ form, setCommonBatchNo, isExpand, setExport, exportExcel }) {
  const [dictObj, setDictObj] = useState({});
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const [caseJson, setCaseJson] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [canRetry, setCanRetry] = useState(false);
  const [searchBoxEnlarged, enlargeSearchBox] = useState(false);
  const [exportLoading, setExportLoading] = useState(false)
  const isSearchBoxExpand = searchBoxEnlarged || isExpand;

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

  const getDicts = async () => {
    const activityKeyResponse = await listProcessAct();
    if (activityKeyResponse && activityKeyResponse.success) {
      setDictObj((item) => ({
        ...item,
        bizActivityKey: lodash
          .chain(activityKeyResponse.resultData)
          .values()
          .flatten()
          .filter((item) => item.autoActivity === 1)
          .map((item) => ({
            dictCode: item.processActivityKey,
            dictName: item.processActivityName,
          }))
          .uniqBy('dictCode')
          .value(),
      }));
    }
    const integrationResponse = await getAllIntegrationCode();
    if (integrationResponse && integrationResponse.success) {
      setDictObj((item) => ({
        ...item,
        integrationCode: lodash
          .chain(integrationResponse.resultData)
          .map((item) => ({
            dictCode: item.integrationCode,
            dictName: item.integrationCode,
          }))
          .uniqBy('dictCode')
          .value(),
      }));
    }
  };

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
  }) => {
    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }
    let errors = null;
    try {
      await form.validateFields();
    } catch (error) {
      errors = error;
    }

    if (!lodash.isEmpty(errors)) {
      return;
    }

    let newParams = form.getFieldsValue();

    if (params) {
      newParams = params;
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

    if (!params) {
      setPagination((item) => {
        return { ...item, page: 1 }
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
      ...monitorParams(MonitorItemCode.tools_query_integration_exception_case, {
        params: filterEmptyValue(newParams),
        currentPage,
        pageSize,
      })
    );

    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      setList(lodash.uniqBy(parseData?.rows || [], 'id'));
      setCanRetry(true);
      setPagination((item) => {
        return { ...item, total: parseData?.total, page: currentPage }
      });
      setSelectedRow([]);
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const submitHandle = async () => {
    const data = selectedRow
      .map((item) => list.find((listItem) => listItem.id === item))
      .filter((item) => !lodash.isEmpty(item?.exceptionCaseNo))
      .map((item) => item.exceptionCaseNo);

    if (lodash.isEmpty(data)) {
      notification.error({ message: 'not empty!' });
      return;
    }
    setRetryLoading(true);
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_batch_retry_integration_exception_case, data)
    );
    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || '';
      setCommonBatchNo(parseData);
      setCanRetry(false);
    } else {
      handleMessageModal(response.messageList);
    }
    setRetryLoading(false);
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
    getDicts();
  }, []);

  useEffect(() => {
    if (list && list.length) searchHandle({ params: searchForm });
  }, [isExpand]);

  const onExport = async () => {
    let errors = null;
    try {
      await form.validateFields();
    } catch (error) {
      errors = error;
    }

    if (!lodash.isEmpty(errors)) {
      return;
    }

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
      monitorParams(MonitorItemCode.tools_query_integration_exception_case, {
        params: filterEmptyValue(newParams),
        currentPage: 1,
        pageSize: 1000,
      }), setExportLoading
    )
  }

  return (
    <div className={styles.activeIssusBox}>
      <div className={styles.subTitle}>{formatMessageApi({ Label_COM_MonitorCenter: 'ActiveIssue' })}</div>
      <div className={styles.searchBox}>
        <div className={styles.fieldBox}>
          <FormItemInput
            form={form}
            formName="bizCaseNo"
            labelId="CaseNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
          <FormItemSelect
            form={form}
            formName="integrationCode"
            labelId="IntegrationCode"
            labelTypeCode="Label_COM_MonitorCenter"
            dicts={dictObj?.integrationCode || []}
            required={!lodash.isEmpty(form.getFieldsValue().errorMsg)}
          />
          <FormItemInput
            form={form}
            formName="bizBusinessNo"
            labelId="BusinessNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />
          <FormItemDateRangePicker
            form={form}
            labelId="RequestTime"
            labelTypeCode="Label_COM_MonitorCenter"
            formName="requestTime"
          />
          {isSearchBoxExpand && (
            <>
              <FormItemSelect
                form={form}
                formName="bizActivityKey"
                labelTypeCode="Label_COM_MonitorCenter"
                labelId="CurrentActivity"
                dicts={dictObj?.bizActivityKey || []}
              />
              <FormItemInput
                className={styles.input}
                form={form}
                formName="errorMsg"
                labelId="ErrorKeyword"
                labelTypeCode="Label_COM_MonitorCenter"
              />
            </>
          )}
          {!isExpand && (
            <Icon
              component={expandSVG}
              className={classnames(
                styles.expandIcon,
                searchBoxEnlarged ? styles.iconRotated : void 0
              )}
              onClick={() => enlargeSearchBox(!searchBoxEnlarged)}
            />
          )}
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
          <div style={{display: 'flex'}}>
            <Button
              loading={searchLoading || retryLoading}
              onClick={submitHandle}
              disabled={lodash.isEmpty(selectedRow) || !canRetry}
            >
              {!(searchLoading || retryLoading) && <Icon component={forwardSVG} />}
              <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Submit' })}</span>
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
          rowKey={(row) => row.id}
          rowClassName={(row) => {
            if (lodash.isEmpty(row?.exceptionCaseNo)) {
              return 'selectionHidden';
            }
            return '';
          }}
          columns={Columns(copyJson, copyLoading)}
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
                setSelectedRow([...selectedRow, record.id]);
              } else {
                setSelectedRow(selectedRow.filter((item) => item !== record.id));
              }
            },
            onSelectAll: (selected, selectedRows) => {
              if (selected) {
                setSelectedRow(selectedRows.map((item) => item.id));
              } else {
                setSelectedRow([]);
              }
            },
          }}
        />
      </div>
    </div>
  );
}
export default Form.create()(IntegrationError);
