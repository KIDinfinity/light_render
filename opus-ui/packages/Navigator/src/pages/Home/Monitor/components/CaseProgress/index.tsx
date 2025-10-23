import React, { useEffect, useState, useMemo } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, Col } from 'antd';
import { FormItemInput } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Columns from './Columns';
import lodash from 'lodash';
import { filterEmptyValue, monitorParams } from '../../utils';
import { handleMessageModal } from '@/utils/commonMessage';
import classnames from 'classnames';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';
import { centerRequest } from '@/services/monitorCenterControllerService';
import { MonitorItemCode } from '../../enum';
import { safeParseUtil } from '@/utils/utils';
import useGetFieldsLayoutByMode from './hooks/useGetFieldsLayoutByMode';
import useJudgeDisplayExpand from './hooks/useJudgeDisplayExpand';

function CaseProgress({ form, isExpand, setExpand }: any) {
  const mode = useGetScenarioMode();
  const fieldLayout = useGetFieldsLayoutByMode();
  const displayExpand = useJudgeDisplayExpand();
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({});
  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [sortObj, setSortObj] = useState({ sortName: null, sortOrder: null });

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
      currentPage = 1; //if search, reset currentPage to 1
    } else {
      newParams = params;
    }

    try {
      const response = await centerRequest(
        ...monitorParams(MonitorItemCode.tools_query_case_by_condition, {
          params: filterEmptyValue({ ...newParams, ...sortObj }),
          currentPage,
          pageSize,
        })
      );

      if (response && response.success) {
        const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
        const rows = lodash.map(parseData?.rows, (item, index) => ({
          ...item,
        }));
        setList(rows);
        setPagination((item) => ({ ...item, total: parseData?.total, page: currentPage }));
      } else {
        handleMessageModal(response?.messageList || response?.promptMessages);
      }
    } catch (err) {
      handleMessageModal(err ?? 'Search Error');
    }
    setSearchLoading(false);
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));
    searchHandle({
      currentPage: changePage,
      pageSize: changePageSize,
      params: searchForm,
    });
  };

  const handleHeaderCell = (column: { key: string | undefined }) => {
    const selectSortName = column.key;
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

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'CaseProgress' })}
      click={() => setExpand(!isExpand)}
      displayExpand={displayExpand}
    >
      <div className={styles.searchBox}>
        <div className={styles.inputField} type="flex">
          <Col {...fieldLayout}>
            <FormItemInput
              form={form}
              formName="policyNo"
              labelId="PolicyNo"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>

          <Col {...fieldLayout}>
            <FormItemInput
              form={form}
              formName="businessNo"
              labelId="BusinessNo"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>

          <Col {...fieldLayout}>
            <FormItemInput
              form={form}
              formName="caseNo"
              labelId="CaseNo"
              labelTypeCode="Label_COM_MonitorCenter"
            />
          </Col>
        </div>

        <Button
          type="primary"
          block
          className={styles.button}
          disabled={searchLoading}
          onClick={searchHandle}
          loading={searchLoading}
        >
          {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
        </Button>
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
        />
      </div>
    </Commonbox>
  );
}

export default Form.create()(CaseProgress);
