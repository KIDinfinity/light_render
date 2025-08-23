import React, { useEffect, useState, useMemo } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, Icon, Row, Col } from 'antd';
import { FormItemSelect, FormItemInput, FormItemDateRangePicker } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Columns from './Columns';
import { centerRequest } from '@/services/monitorCenterControllerService';
import lodash from 'lodash';
import moment from 'moment';
import { MonitorItemCode } from '../../enum';
import { filterEmptyValue, monitorParams } from '../../utils';
import { safeParseUtil } from '@/utils/utils';
import { handleMessageModal } from '@/utils/commonMessage';
import classnames from 'classnames';
import { ReactComponent as RetryIcon } from '@/assets/Retry.svg';
import { ReactComponent as ExcludeIcon } from 'navigator/assets/remove.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';
import useJudgeDisplayExpand from './hooks/useJudgeDisplayExpand';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';
import { getDrowDownList } from '@/utils/dictFormatMessage';

function MIReport({ form, isExpand, setExpand, exportExcel }: any) {
  const mode = useGetScenarioMode();
  const displayExpand = useJudgeDisplayExpand();
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [retryLoading, setRetryLoading] = useState(false);
  const [excludeLoading, setExcludeLoading] = useState(false);
  const [searchForm, setSearchForm] = useState<any>({});
  const [selectedRow, setSelectedRow]: any[] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [sortObj, setSortObj] = useState<any>({ sortName: null, sortOrder: null });
  const [exportLoading, setExportLoading] = useState(false);

  const Dropdown_COM_MiUpload = getDrowDownList('Dropdown_IDN_miUploadStatus');
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

  const searchHandle = async ({
    params = {},
    currentPage = pagination.page,
    pageSize = actualPageSize,
    changePageNo = 1,
    defaultCode = MonitorItemCode.tools_search_mi_report,
  }) => {
    const newParams = form.getFieldsValue();
    let page = changePageNo === 1 ? currentPage : 1;
    if (pagination.total && pageSize * (page - 1) > pagination.total) {
      page = Math.ceil(pagination.total / pageSize);
    }

    let _currentPage = currentPage;
    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      _currentPage = Math.ceil(pagination.total / pageSize);
    }

    if (!params) {
      setPagination((item) => ({ ...item, page: 1 }));
      setSearchForm(newParams);
    }

    setSearchLoading(true);

    if (!lodash.isEmpty(newParams?.creationDate)) {
      newParams.creationDateFrom = moment(newParams?.creationDate[0]).format('YYYY/MM/DD');
      newParams.creationDateTo = moment(newParams?.creationDate[1]).format('YYYY/MM/DD');
      delete newParams.creationDate;
    }

    if (!lodash.isNil(newParams.uploadStatus)) {
      newParams.uploadStatus = lodash.find(
        Dropdown_COM_MiUpload,
        (item) => item.dictName === newParams.uploadStatus
      )?.dictCode;
    }

    const response = await centerRequest(
      ...monitorParams(defaultCode, {
        params: filterEmptyValue({ ...newParams, ...sortObj }),
        currentPage: _currentPage,
        pageSize,
      })
    );
    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      const rows = lodash.map(parseData?.rows, (item) => ({
        ...item,
      }));
      setList(rows);
      setPagination((item) => ({ ...item, total: parseData?.total, page: _currentPage }));
    } else {
      handleMessageModal(response?.messageList || response?.promptMessages);
    }
    setSearchLoading(false);
  };

  const pageChangeHandle = (changePage: number, changePageSize: number) => {
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

  const retryHandle = async () => {
    setRetryLoading(true);

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_retry_mi_report, {
        params: {
          failTask: selectedRow.map((id) => list.find((i) => i.id === id)),
        },
      })
    );

    const parseResponse = safeParseUtil(response?.responseData?.responseData) || {};

    if (response && response.success && parseResponse?.success) {
      searchHandle({});
      setSelectedRow([]);
    } else {
      handleMessageModal(response.messageList || parseResponse.promptMessages);
    }

    setRetryLoading(false);
  };

  const excludeHandle = async () => {
    setExcludeLoading(true);

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_exclude_mi_report, {
        params: {
          failTask: selectedRow.map((id) => list.find((i) => i.id === id)),
        },
      })
    );
    const parseResponse = safeParseUtil(response?.responseData?.responseData) || {};
    if (response && response.success && parseResponse?.success) {
      searchHandle({});
      setSelectedRow([]);
    } else {
      handleMessageModal(
        response.messageList || parseResponse.promptMessages || response?.responseData?.exceptionMsg
      );
    }

    setExcludeLoading(false);
  };

  const getLoadingStatusWithExcludes = (...excludes: string[]) => {
    const loadingMap = { searchLoading, excludeLoading, retryLoading };
    return lodash
      .chain(loadingMap)
      .entries()
      .filter(([key]) => !lodash.includes(excludes, key))
      .some(([_, value]) => value)
      .value();
  };

  const handleHeaderCell = (column) => {
    const selectSortName = lodash.snakeCase(column.key);
    const newSortObj = { ...sortObj };
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

  const exportHandle = () => {
    const newParams = form.getFieldsValue();
    if (!lodash.isEmpty(newParams?.creationDate)) {
      newParams.creationDateFrom = moment(newParams?.creationDate[0]).format('YYYY/MM/DD');
      newParams.creationDateTo = moment(newParams?.creationDate[1]).format('YYYY/MM/DD');
      delete newParams.creationDate;
    }

    exportExcel(
      monitorParams(MonitorItemCode.tools_export_mi_report, {
        params: filterEmptyValue({ ...newParams, ...sortObj }),
        currentPage: 1,
        pageSize: 1000,
      }),
      setExportLoading
    );
  };

  useEffect(() => {
    searchHandle({ params: searchForm });
  }, [isExpand]);

  const span = isExpand ? 6 : 12;
  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'failMIReport' })}
      click={() => setExpand(!isExpand)}
      displayExpand={displayExpand}
    >
      <div className={styles.searchBox}>
        <Row className={styles.inputField} type="flex">
          <Col span={span}>
            <FormItemInput
              form={form}
              formName="enquiryId"
              labelId="enquiryId"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>
          <Col span={span}>
            <FormItemInput
              form={form}
              formName="businessNo"
              labelId="businessNo"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>
          <Col span={span}>
            <FormItemSelect
              form={form}
              dictCode="dictName"
              formName="uploadStatus"
              labelId="uploadStatus"
              labelTypeCode="Label_COM_MonitorCenter"
              dictTypeCode="Dropdown_IDN_miUploadStatus"
              dicts={Dropdown_COM_MiUpload}
            />
          </Col>
          <Col span={span}>
            <FormItemDateRangePicker
              form={form}
              labelId="creationDate"
              labelTypeCode="Label_COM_MonitorCenter"
              formName="creationDate"
            />
          </Col>
        </Row>
        <Button
          type="primary"
          block
          className={styles.button}
          onClick={() => searchHandle({})}
          loading={searchLoading}
          disabled={getLoadingStatusWithExcludes('searchLoading')}
        >
          {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
        </Button>
      </div>
      <div className={styles.extraButtonBox}>
        <Button
          loading={retryLoading}
          onClick={retryHandle}
          disabled={lodash.isEmpty(selectedRow) || getLoadingStatusWithExcludes('retryLoading')}
        >
          <Icon component={RetryIcon} />
          <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Retry' })}</span>
        </Button>
        <Button
          loading={excludeLoading}
          onClick={excludeHandle}
          disabled={lodash.isEmpty(selectedRow) || getLoadingStatusWithExcludes('excludeLoading')}
        >
          <Icon component={ExcludeIcon} className={styles.excludeIcon} />
          <span className={styles.excludeTxt}>
            {formatMessageApi({ Label_COM_MonitorCenter: 'exclude' })}
          </span>
        </Button>
        <Button loading={exportLoading} onClick={exportHandle} disabled={!list?.length}>
          <Icon component={exportSvg} />
          <span>{formatMessageApi({ Label_COM_MonitorCenter: 'Export' })}</span>
        </Button>
      </div>

      <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
        <Table
          rowKey="id"
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
            onSelect: (record, selected) => {
              if (selected) {
                setSelectedRow((e) => [...e, record?.id]);
              } else {
                setSelectedRow((e) => e.filter((item: any) => item !== record?.id));
              }
            },
            oonSelectAll(_, selectedRows) {
              setSelectedRow(selectedRows.map((item) => item?.id));
            },
          }}
        />
      </div>
    </Commonbox>
  );
}

export default Form.create()(MIReport);
