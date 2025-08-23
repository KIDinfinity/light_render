import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, notification, Icon, Row, Col } from 'antd';
import ButtonDisplayController from './ButtonDisplayController';
import ActionCode from './Enum/ActionCode';
import ActionButton from 'navigator/pages/Home/Monitor/components/ActionButton';
import { FormItemSelect, FormItemInput, FormItemDateRangePicker } from 'basic/components/Form';
import Columns from './Columns';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { MonitorItemCode } from '../../enum';
import { filterEmptyValue, monitorParams } from '../../utils';
import { handleMessageModal } from '@/utils/commonMessage';
import { findAutoActivitiesByCaseCategory } from '@/services/bpmProcessActivityService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findCaseCategoryByTypeCode } from '@/services/miscDictionaryControllerService';
import { tenant } from '@/components/Tenant';
import classnames from 'classnames';
import { ReactComponent as resubmitSVG } from 'navigator/assets/re-submit.svg';
import { ReactComponent as forwardSVG } from 'navigator/assets/forward.svg';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';
import useGetFieldsLayoutByMode from './hooks/useGetFieldsLayoutByMode';
import useJudgeDisplayExpand from './hooks/useJudgeDisplayExpand';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';
import useGetServices from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetServices';
import ActionType from 'navigator/pages/Home/Monitor/Scenario/Enum/ActionType';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';

function ExceptionalCase({
  form,
  isExpand,
  setExpand,
  exportExcel,
  extraHeaderClassName,
  caseNo,
}: any) {
  const mode = useGetScenarioMode();
  const services = useGetServices();
  const fieldLayout = useGetFieldsLayoutByMode();
  const displayExpand = useJudgeDisplayExpand();
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [resubmitLoading, setResubmitLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [caseCategoryList, setCaseCategoryList] = useState([]);
  const [sortObj, setSortObj] = useState({ sortName: null, sortOrder: null });
  const [exportLoading, setExportLoading] = useState(false);

  const { Dropdown_COM_ExceptionType } = getDrowDownList(['Dropdown_COM_ExceptionType']);

  const actualPageSize = useMemo(() => {
    if (pagination.pageSize === 0) {
      if (mode === ScenarioMode.HOME_PAGE) {
        if (isExpand) {
          return 5;
        }
        return 3;
      } else {
        return 10;
      }
    } else {
      return pagination.pageSize;
    }
  }, [isExpand, mode, pagination.pageSize]);
  const activityDict = [
    {
      dictCode: 'app.navigator.taskDetail.inquireForm.label.activity-name-hint-words',
      dictName: formatMessageApi({
        Label_COM_WarningMessage:
          'app.navigator.taskDetail.inquireForm.label.activity-name-hint-words',
      }),
    },
  ];
  const [activityList, setActivityList] = useState(activityDict);

  const getCaseCategory = async () => {
    const response = await findCaseCategoryByTypeCode({
      typeCode: 'Dropdown_PRC_workFlow',
      regionCode: tenant.region(),
      language: 'en-US',
    });
    if (response?.resultData) {
      setCaseCategoryList(response?.resultData);
    }
  };

  const searchHandle = async ({
    params,
    currentPage = pagination.page,
    pageSize = actualPageSize,
    changePageNo,
  }) => {
    const newParams = form.getFieldsValue();
    let page = changePageNo === 1 ? currentPage : 1;
    if (pagination.total && pageSize * (page - 1) > pagination.total) {
      page = Math.ceil(pagination.total / pageSize);
    }

    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    if (!params) {
      setPagination((item) => ({ ...item, page: 1 }));
      setSearchForm(newParams);
    }

    setSearchLoading(true);

    if (!lodash.isEmpty(newParams?.responseTime)) {
      newParams.responseTimeFrom = moment(newParams?.responseTime[0]).format('YYYY/MM/DD');
      newParams.responseTimeTo = moment(newParams?.responseTime[1]).format('YYYY/MM/DD');
      delete newParams.responseTime;
    }
    if (!lodash.isEmpty(newParams.hasErrorMsg)) {
      newParams.hasErrorMsg = newParams.hasErrorMsg === 'Y' ? true : false;
    }

    try {
      const response = await services[ActionType.SEARCH]({
        params: filterEmptyValue({ ...newParams, ...sortObj }),
        currentPage: page,
        pageSize: pageSize,
      });
      if (response && response.success) {
        const parseData = response?.resultData || {};
        setList(lodash.uniqBy(parseData?.rows || [], 'caseNo'));
        setPagination((item) => ({
          ...item,
          total: parseData?.total,
          page: page,
        }));
        setSelectedRow([]);
      } else {
        handleMessageModal(response?.messageList || response?.promptMessages);
      }
    } catch (err) {}
    setSearchLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    setSelectedRow([]);
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));
    searchHandle({
      currentPage: changePage,
      pageSize: changePageSize,
      params: searchForm,
      changePageNo: 1,
    });
  };

  const submitHandle = async () => {
    setSubmitLoading(true);
    const params = {
      caseNos: selectedRow,
    };
    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_batch_push_activity, {
        params,
      })
    );
    if (response && response.success) {
      notification.success({ message: 'Success!' });
    }
    setSelectedRow([]);
    searchHandle({});
    setSubmitLoading(false);
  };

  const retryHandle = async () => {
    setRetryLoading(true);
    const params = {
      caseNos: selectedRow,
    };
    const response = await services[ActionType.RETRY]({ params });
    if (response && response.success) {
      notification.success({ message: 'Success!' });
    }
    setSelectedRow([]);
    searchHandle({});
    setRetryLoading(false);
  };

  const handleChange = async (e: any) => {
    form.setFieldsValue({
      activityKey: void 0,
    });
    const caseCategory = e;
    if (!e) {
      setActivityList(activityDict);
      return;
    }
    const response = await findAutoActivitiesByCaseCategory(objectToFormData({ caseCategory }));
    if (response?.success && response?.resultData) {
      const result = lodash
        .chain(response.resultData)
        .map((item) => ({
          dictCode: item.processActivityKey,
          dictName: item.processActivityName,
        }))
        .uniqBy('dictCode')
        .value();
      setActivityList(result);
    }
  };
  const previousCaseNo = useRef(null);

  useEffect(() => {
    if (caseNo && caseNo !== previousCaseNo.current) {
      form.setFieldsValue({ caseNo }); // 将 caseNo 设置到表单中
      previousCaseNo.current = caseNo;
    }
    searchHandle({ params: searchForm });
  }, [isExpand, caseNo, form]);

  useEffect(() => {
    getCaseCategory();
  }, []);

  const resubmitHandle = async () => {
    setResubmitLoading(true);
    const requestData = lodash
      .chain(list)
      .filter((item) => lodash.includes(selectedRow, item.caseNo))
      .map((item) => ({ caseNo: item.caseNo, taskId: item.taskId, businessNo: item.businessNo }))
      .value();
    const response = await services[ActionType.RESUBMIT](requestData);
    if (response && response.success) {
      notification.success({ message: 'Success!' });
    }
    setSelectedRow([]);
    searchHandle({});
    setResubmitLoading(false);
  };

  const getLoadingStatusWithExcludes = (...excludes: string[]) => {
    const loadingMap = { searchLoading, submitLoading, resubmitLoading, retryLoading };
    return lodash
      .chain(loadingMap)
      .entries()
      .filter(([key]) => !lodash.includes(excludes, key))
      .some(([_, value]) => value)
      .value();
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

  const onExport = () => {
    const newParams = form.getFieldsValue();
    if (!lodash.isEmpty(newParams.hasErrorMsg)) {
      newParams.hasErrorMsg = newParams.hasErrorMsg === 'Y' ? true : false;
    }

    if (!lodash.isEmpty(newParams?.responseTime)) {
      newParams.responseTimeFrom = moment(newParams?.responseTime[0]).format('YYYY/MM/DD');
      newParams.responseTimeTo = moment(newParams?.responseTime[1]).format('YYYY/MM/DD');
      delete newParams.responseTime;
    }

    exportExcel(
      monitorParams(MonitorItemCode.tools_query_exceptional_case, {
        params: filterEmptyValue({ ...newParams, ...sortObj }),
        currentPage: 1,
        pageSize: 1000,
      }),
      setExportLoading
    );
  };

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'CasesStuckAtAutoActivity' })}
      click={() => setExpand(!isExpand)}
      displayExpand={displayExpand}
      extraHeaderClassName={extraHeaderClassName}
    >
      <div className={styles.searchBox}>
        <Row className={styles.inputField} type="flex">
          <Col {...fieldLayout}>
            <FormItemInput
              form={form}
              formName="caseNo"
              labelId="CaseNo"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>
          <Col {...fieldLayout}>
            <FormItemInput
              form={form}
              formName="policyNo"
              labelId="PolicyNo"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>

          <Col {...fieldLayout}>
            <FormItemSelect
              form={form}
              formName="caseCategory"
              labelId="CaseCategory"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={caseCategoryList}
              required={!lodash.isEmpty(form.getFieldsValue().errorMsg)}
              onChange={handleChange}
            />
          </Col>
          <Col {...fieldLayout}>
            <FormItemSelect
              form={form}
              formName="activityKey"
              labelTypeCode="Label_COM_MonitorCenter"
              labelId="Activity"
              dicts={activityList}
              existCodes={['app.navigator.taskDetail.inquireForm.label.activity-name-hint-words']}
            />
          </Col>
          <Col {...fieldLayout}>
            <FormItemSelect
              dicts={Dropdown_COM_ExceptionType}
              form={form}
              formName="exceptionType"
              labelId="ExceptionType"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>
          <Col {...fieldLayout}>
            <FormItemInput
              form={form}
              placeholder={formatMessageApi({ Label_COM_MonitorCenter: 'fuzzyQuery' })}
              formName="exceptionMsg"
              labelTypeCode="Label_COM_MonitorCenter"
              labelId="ExceptonMessage"
            />
          </Col>

          <FormItemDateRangePicker
            form={form}
            labelId="ResponseTime"
            formName="responseTime"
            labelTypeCode="Label_COM_MonitorCenter"
          />
        </Row>
        <Button
          type="primary"
          block
          className={styles.button}
          onClick={searchHandle}
          loading={searchLoading}
          disabled={getLoadingStatusWithExcludes('searchLoading')}
        >
          {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
        </Button>
      </div>
      <div className={styles.extraButtonBox}>
        <ButtonDisplayController actionCode={ActionCode.RETRY}>
          <ActionButton
            loading={retryLoading}
            onClick={retryHandle}
            iconComponent={<Icon component={RetryIcon} />}
            disabled={lodash.isEmpty(selectedRow) || getLoadingStatusWithExcludes('retryLoading')}
          >
            <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Retry' })}</span>
          </ActionButton>
        </ButtonDisplayController>
        <ButtonDisplayController actionCode={ActionCode.RESUBMIT}>
          <ActionButton
            loading={resubmitLoading}
            onClick={resubmitHandle}
            iconComponent={<Icon component={resubmitSVG} />}
            disabled={
              lodash.isEmpty(selectedRow) || getLoadingStatusWithExcludes('resubmitLoading')
            }
          >
            <span>{formatMessageApi({ Label_COM_MonitorCenter: 'ReSubmit' })}</span>
          </ActionButton>
        </ButtonDisplayController>
        <ButtonDisplayController actionCode={ActionCode.NEXT_NODE}>
          <ActionButton
            loading={submitLoading}
            onClick={submitHandle}
            iconComponent={<Icon component={forwardSVG} />}
            disabled={lodash.isEmpty(selectedRow) || getLoadingStatusWithExcludes('submitLoading')}
          >
            <span>{formatMessageApi({ Label_COM_MonitorCenter: 'NextNode' })}</span>
          </ActionButton>
        </ButtonDisplayController>
        <ButtonDisplayController actionCode={ActionCode.EXPORT}>
          <ActionButton
            loading={exportLoading}
            onClick={onExport}
            iconComponent={<Icon component={exportSvg} />}
          >
            <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Export' })}</span>
          </ActionButton>
        </ButtonDisplayController>
      </div>
      <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
        <Table
          rowKey="caseNo"
          columns={Columns({ handleHeaderCell })}
          dataSource={list || []}
          loading={searchLoading}
          scroll={{ x: true }}
          style={{ whiteSpace: 'nowrap' }}
          pagination={{
            size: 'small',
            pageSize: actualPageSize,
            total: pagination?.total,
            current: pagination.page,
            showSizeChanger: true,
            onChange: pageChangeHandle,
            onShowSizeChange: pageChangeHandle,
          }}
          rowSelection={{
            selectedRowKeys: selectedRow,
            onSelect: (record, selected, e) => {
              if (selected) {
                setSelectedRow((e) => [...e, record?.caseNo]);
              } else {
                setSelectedRow((e) => e.filter((item) => item !== record?.caseNo));
              }
            },
            onSelectAll(selected, selectedRows, changeRows) {
              setSelectedRow(selectedRows.map((item) => item?.caseNo));
            },
          }}
        />
      </div>
    </Commonbox>
  );
}

export default Form.create()(ExceptionalCase);
