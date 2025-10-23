import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Commonbox } from '../index';
import styles from './index.less';
import { Form, Button, Table, notification, Icon } from 'antd';
import { FormItemSelect, FormItemInput } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Columns, { postQCStatusList } from './Columns';
import { tenant } from '@/components/Tenant';
import { findCaseCategoryByTypeCode } from '@/services/miscDictionaryControllerService';
import { queryDataList, mapListData, reGenerate } from './utils';
import { filterEmptyValue, monitorParams } from '../../utils';
import { MonitorItemCode } from '../../enum';
import { handleMessageModal } from '@/utils/commonMessage';
import lodash from 'lodash';
import classnames from 'classnames';
import { ReactComponent as regenerateSVG } from 'navigator/assets/regenerate.svg';
import { ReactComponent as exportSvg } from 'navigator/assets/export.svg';

function PostQCTrigger({ form, setExpand, isExpand, exportExcel }) {
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 0, total: 0, page: 1 });
  const [selectedRows, setSelectedRows] = useState([]);
  const [listData, setListData] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  const [caseCategoryList, setCaseCategoryList] = useState([]);
  const [exportLoading, setExportLoading] = useState(false)

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const pageChangeHandle = useCallback(
    async (page: number, pageSize: number = actualPageSize) => {
      setSearchLoading(true);
      try {
        if (pagination.total && pageSize * (page - 1) > pagination.total) {
          page = Math.ceil(pagination.total / pageSize);
        }
        const res = await queryDataList({ page, pageSize: pageSize }, queryParams);
        setSearchLoading(false);
        setPagination((curPagination) => ({
          ...curPagination,
          page,
          pageSize: pageSize === actualPageSize ? pagination.pageSize : pageSize,
          total: res?.total || pagination.total,
        }));
        setListData(mapListData(res?.rows));
      } catch (errorList) {
        handleMessageModal(errorList);
        setSearchLoading(false);
      }
    },
    [pagination, queryParams, actualPageSize]
  );

  const handleReset = () => {
    form.resetFields();
    setQueryParams({});
    setSelectedRows([]);
  };

  const handleSearch = useCallback(async () => {
    await pageChangeHandle(1);
  }, [pageChangeHandle]);

  const handleReGen = async () => {
    setSubmitLoading(true);
    try {
      await reGenerate(selectedRows);
      setSelectedRows([]);
      pageChangeHandle(pagination.page);
      setSubmitLoading(false);
      notification.success({
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000843' }),
      });
    } catch (errorList) {
      setSubmitLoading(false);
      pageChangeHandle(pagination.page);
    }
  };

  const handleQueryParamsChange = (field: string) => (e) => {
    setQueryParams({ ...queryParams, [field]: lodash.isString(e) ? e : e?.target?.value });
  };

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

  const onRowChange = (_, rows) => {
    setSelectedRows(rows);
  };

  const selectedKeys = useMemo(
    () =>
      lodash
        .chain(selectedRows)
        .filter((row) => row.status !== 'Success')
        .map((row) => row.id)
        .value(),
    [selectedRows]
  );

  const checkBoxProps = useCallback(
    (record) => ({
      disabled: record.status === 'Success' || searchLoading || submitLoading,
      name: record.name,
    }),
    [searchLoading, submitLoading]
  );

  useEffect(() => {
    getCaseCategory();
  }, []);

  useEffect(() => {
    pageChangeHandle(1);
  }, [isExpand]);

  const onExport = () => {
    exportExcel(
      monitorParams(MonitorItemCode.tools_post_qc_trigger, {
        params: filterEmptyValue(queryParams),
        currentPage: 1,
        pageSize: 1000,
      }), setExportLoading
    )
  }

  return (
    <div className={styles.integrationErrorBox}>
      <Commonbox
        title={formatMessageApi({ Label_COM_MonitorCenter: 'PostQCTrigger' })}
        click={() => setExpand(!isExpand)}
      >
        <div className={styles.searchBox}>
          <div
            className={styles.fieldBox}
          >
            <FormItemSelect
              form={form}
              formName="caseCategory"
              labelId="CaseCategory"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={caseCategoryList}
              onChange={handleQueryParamsChange('caseCategory')}
            />
            <FormItemSelect
              form={form}
              formName="status"
              labelTypeCode="Label_COM_MonitorCenter"
              labelId="PostQCStatus"
              dicts={postQCStatusList}
              onChange={handleQueryParamsChange('status')}
            />
            <FormItemInput
              form={form}
              formName="inquiryBusinessNo"
              labelTypeCode="Label_COM_MonitorCenter"
              labelId="ApplicationNo"
              onBlur={handleQueryParamsChange('inquiryBusinessNo')}
            />
          </div>
          <div className={styles.buttonBox}>
            <Button
              type="primary"
              block
              className={styles.button}
              onClick={handleSearch}
              loading={searchLoading}
            >
              {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
            </Button>
            <div style={{display: 'flex'}}>
              <Button
                loading={submitLoading}
                onClick={handleReGen}
                disabled={selectedRows.length === 0}
              >
                {!submitLoading && <Icon component={regenerateSVG} />}
                <span>{formatMessageApi({ Label_COM_MonitorCenter: 'ReGenerate' })}</span>
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
            dataSource={listData.slice(0, actualPageSize)}
            loading={searchLoading}
            scroll={{ x: true }}
            style={{ whiteSpace: 'nowrap' }}
            rowSelection={{
              selectedRowKeys: selectedKeys,
              onChange: onRowChange,
              getCheckboxProps: checkBoxProps,
            }}
            pagination={{
              size: 'small',
              hideOnSinglePage: true,
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
    </div>
  );
}

export default Form.create()(PostQCTrigger);
