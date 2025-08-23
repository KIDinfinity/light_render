import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Icon, Col, Row } from 'antd';
import { FormItemDateRangePicker, FormItemInput, FormItemSelect } from 'basic/components/Form';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './Columns';
import { getAsyncSubmissionRequestData } from '@/services/integrationProcessControllerService';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { MonitorItemCode } from '../../enum';
import { copy, filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import classnames from 'classnames';
import { Commonbox } from '../index';
import { handleSuccessMessageModal, handleMessageModal } from '@/utils/commonMessage';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';

function IntegrationError({ form, isExpand, exportExcel, setExpand }) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [canRetry, setCanRetry] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const { Dropdown_COM_SubmissionStatus } = getDrowDownList(['Dropdown_COM_SubmissionStatus']);

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const copyJson = async (id) => {
    setCopyLoading(true);

    const response = await getAsyncSubmissionRequestData({ id });
    if (response && response.success) {
      copy(response.resultData || '{}');
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setCopyLoading(false);
  };

  const searchHandle = async (
    { params, currentPage = 1, pageSize = actualPageSize },
    saveSelectRow,
    onceSearchParams
  ) => {
    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    let newParams = form.getFieldsValue();

    if (params) {
      newParams = params;
    }

    if (!params && !onceSearchParams) {
      setPagination((item) => {
        return { ...item, page: 1 };
      });
      setSearchForm(newParams);
    }

    setSearchLoading(true);

    if (!lodash.isEmpty(newParams?.receiveDate)) {
      newParams.receiveDateFrom = moment(newParams?.receiveDate[0]).format('YYYY/MM/DD');
      newParams.receiveDateTo = moment(newParams?.receiveDate[1]).format('YYYY/MM/DD');
      delete newParams.receiveDate;
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
      setList(parseData?.rows);
      setCanRetry(true);
      if (!saveSelectRow) {
        setSelectedRow([]);
      }
      setPagination((item) => {
        return { ...item, total: parseData?.total, page: currentPage };
      });
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const retryHandle = async () => {
    setRetryLoading(true);
    const params = {
      idList: selectedRow,
    };
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_retry_cases_with_submission_error_data, {
        params,
      })
    );
    const parseResponse = safeParseUtil(response?.responseData?.responseData) || {};
    let idList = [];
    if (response && response.success) {
      const retryInprogree = lodash.filter(parseResponse?.resultData, (i) => !i?.success);
      const retrySuccess = lodash.filter(parseResponse?.resultData, (i) => i?.caseNo);
      const retrySuccessId = lodash.map(retrySuccess, (i) => i?.id);
      const retryFail = lodash.filter(parseResponse?.resultData, (i) => !i?.caseNo);
      idList = lodash.map(parseResponse?.resultData, (i) => i?.dataId);

      if (!lodash.isEmpty(retrySuccess)) {
        handleSuccessMessageModal(
          formatMessageApi(
            {
              Label_COM_WarningMessage: 'MSG_001338',
            },
            lodash.map(retrySuccess, (i) => i?.caseNo).join(',')
          ),
          {
            okFn: () => {},
          },
          true
        );
        setSelectedRow((e) => e.filter((i) => !retrySuccessId.includes(i)));
      }
      if (!lodash.isEmpty(retryFail)) {
        handleMessageModal([
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_001342',
            }),
          },
        ]);
      }
      if (!lodash.isEmpty(retryInprogree)) {
        handleMessageModal([
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_001337',
            }),
          },
        ]);
      }
    }

    searchHandle({ params: { idList }, currentPage: 1, pageSize: 10 }, true, true);
    setRetryLoading(false);
  };

  const onExport = () => {
    const newParams = form.getFieldsValue();
    if (!lodash.isEmpty(newParams?.receiveDate)) {
      newParams.receiveDateFrom = moment(newParams?.receiveDate[0]).format('YYYY/MM/DD');
      newParams.receiveDateTo = moment(newParams?.receiveDate[1]).format('YYYY/MM/DD');
      delete newParams.receiveDate;
    }
    exportExcel(
      monitorParams(MonitorItemCode.tools_cases_with_submission_error_data, {
        params: filterEmptyValue(newParams),
        currentPage: 1,
        pageSize: 10,
      }),
      setExportLoading
    );
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => {
        return { ...item, page: changePage, pageSize: changePageSize };
      });
    else {
      setPagination((item) => {
        return { ...item, page: changePage };
      });
    }
    searchHandle({
      currentPage: changePage,
      pageSize: changePageSize,
      params: searchForm,
    });
  };

  useEffect(() => {
    searchHandle({ params: searchForm });
  }, [isExpand]);

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'CasesWithSubmissionErrorData' })}
      click={() => setExpand(!isExpand)}
    >
      <div className={styles.searchBox}>
        <div className={styles.inputField}>
          <Row gutter={[10, 0]}>
            <Col span={isExpand ? 8 : 12}>
              <FormItemInput
                form={form}
                formName="policyIds"
                labelId="PolicyNo"
                labelTypeCode="Label_COM_MonitorCenter"
              />
            </Col>
            <Col span={isExpand ? 8 : 12}>
              <FormItemSelect
                form={form}
                formName="requestStatus"
                labelTypeCode="Label_COM_MonitorCenter"
                labelId="RequestStatus"
                dicts={Dropdown_COM_SubmissionStatus}
              />
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={isExpand ? 8 : 12}>
              <FormItemInput
                form={form}
                formName="integrationSessionId"
                labelId="IntegrationSessionId"
                labelTypeCode="Label_COM_MonitorCenter"
              />
            </Col>
            <Col span={isExpand ? 8 : 12}>
              <FormItemDateRangePicker
                form={form}
                labelId="ReceiveDate"
                formName="receiveDate"
                labelTypeCode="Label_COM_MonitorCenter"
              />
            </Col>
          </Row>
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
            <Button loading={exportLoading} onClick={onExport}>
              {!exportLoading && <Icon component={exportSvg} />}
              <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Export' })}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
        <Table
          rowKey={(row) => row?.id}
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
            columnTitle: ' ', // 设为空字符串
            selectedRowKeys: selectedRow,
            getCheckboxProps: (record) => ({
              hideSelectAll: true,
              disabled: !['retry', 'error', 'fail'].includes(record?.requestStatus),
            }),
            onSelect: (record, selected) => {
              if (selected) {
                setSelectedRow([record.id]);
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
