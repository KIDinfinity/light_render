import React, { useEffect, useState, useMemo } from 'react';
import { Form, Button, Table, Icon, notification } from 'antd';
import { FormItemInput, FormItemDateRangePicker, FormItemSelect } from 'basic/components/Form';
import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './Columns';
import { handleMessageModal } from '@/utils/commonMessage';
import lodash from 'lodash';
import classnames from 'classnames';
import {
  getExecutedHistory,
  downloadRollbackSqlFile,
} from '@/services/ccSupportToolControllerService';
import moment from 'moment';
import { useSelector } from 'dva';
import { TypeEnum } from '@/enum/GolbalAuthority';
import { getCommonAuthorityList } from '@/auth/Utils';
import { ButtonEnum } from '../../enum';

function ExecutedHistory({ form, isExpand = false, autoSearch }) {
  const commonAuthorityList =
    useSelector(({ authController }: any) => authController.commonAuthorityList) || [];
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [searchForm, setSearchForm] = useState();
  const [pagination, setPagination] = useState({ page: 1, pageSize: 5, total: 0 });
  const [sortObj, setSortObj] = useState({});
  const { Dropdown_CFG_ExecuteStatus } = getDrowDownList(['Dropdown_CFG_ExecuteStatus']);

  const rollbackAuth = useMemo(() => {
    return getCommonAuthorityList(commonAuthorityList || [], {
      data: ButtonEnum.RS_BP_Menu_Monitor_DBATool,
      type: TypeEnum.Comm,
    })?.result;
  }, [commonAuthorityList]);

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 5) actualPageSize = isExpand ? 10 : 5;

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
    if (!lodash.isEmpty(newParams?.executeStartTime)) {
      newParams.executeStartTime = [
        moment(newParams?.executeStartTime[0]).format('YYYY-MM-DD'),
        moment(newParams?.executeStartTime[1]).format('YYYY-MM-DD'),
      ];
    }
    const response = await getExecutedHistory({
      params: {
        ...newParams,
        ...sortObj,
      },
      currentPage: currentPage,
      pageSize: pageSize,
    });

    if (response && response.success) {
      const resultData = response.resultData;
      setList(resultData?.rows || []);
      setSelectedRow([]);
      setPagination((item) => ({ ...item, total: resultData?.total, page: currentPage }));
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
  };

  const handleHeaderCell = (column) => {
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

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));
    searchHandle({ currentPage: changePage, pageSize: changePageSize, params: searchForm });
  };

  const downloadRollbackSqlFileHandle = async () => {
    setDownloadLoading(true);
    if (selectedRow.length) {
      const response = await downloadRollbackSqlFile({
        batchId: selectedRow[0],
      });
      if (response?.success === false) {
        notification.error({
          message: formatMessageApi({ Label_COM_MonitorCenter: 'exportFail' }),
        });
      } else {
        notification.success({
          message: formatMessageApi({ Label_COM_MonitorCenter: 'exportSuccess' }),
        });
        setSelectedRow([]);
      }
    }
    setDownloadLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      executeStartTime: [moment().subtract(20, 'days'), moment()],
    });
  }, []);

  useEffect(() => {
    searchHandle({ currentPage: 1 });
  }, [isExpand, autoSearch]);

  const otherData = rollbackAuth
    ? {
        rowSelection: {
          columnTitle: ' ', // 设为空字符串
          selectedRowKeys: selectedRow,
          getCheckboxProps: (record) => ({
            hideSelectAll: true,
            disabled: record.status !== 'success' || !record.canGenerateRollbackSql,
          }),
          onSelect: (record, selected, e) => {
            if (selected) {
              setSelectedRow([record.id]);
            } else {
              setSelectedRow([]);
            }
          },
        },
      }
    : {};

  return (
    <div className={classnames(styles.executedHistory, isExpand && styles.w49)}>
      <div className={classnames(styles.historyLabel, isExpand && styles.historyLabelExpand)}>
        {formatMessageApi({ Label_COM_MonitorCenter: 'ExecutedHistory' })}
      </div>
      <div className={styles.searchBox}>
        <div className={styles.inputField}>
          <div className={styles.inputFieldItem}>
            <FormItemInput
              form={form}
              formName="fileName"
              labelId="FileName"
              labelTypeCode="Label_COM_MonitorCenter"
            />
            <FormItemSelect
              form={form}
              formName="status"
              labelId="ExecuteStatus"
              labelTypeCode="Label_COM_MonitorCenter"
              dicts={Dropdown_CFG_ExecuteStatus}
            />
          </div>
          <div className={styles.inputFieldItem}>
            <FormItemDateRangePicker
              form={form}
              labelId="ExecuteDate"
              labelTypeCode="Label_COM_MonitorCenter"
              formName="executeStartTime"
              defaultPickerValue={[moment().subtract(20, 'days'), moment()]}
            />
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button
            type="primary"
            block
            className={styles.button}
            disabled={downloadLoading}
            onClick={searchHandle}
            loading={searchLoading}
          >
            {formatMessageApi({ Label_COM_MonitorCenter: 'Search' })}
          </Button>
          {rollbackAuth && (
            <Button
              block
              className={styles.button}
              onClick={downloadRollbackSqlFileHandle}
              loading={downloadLoading}
              disabled={!selectedRow.length || searchLoading}
            >
              <Icon type="download" />
              {formatMessageApi({ Label_COM_MonitorCenter: 'Rollback file' })}
            </Button>
          )}
        </div>
      </div>
      <div className={classnames(styles.list)}>
        <Table
          rowKey="id"
          tableLayout="fixed"
          columns={Columns({ handleHeaderCell })}
          dataSource={list || []}
          scroll={{
            x: 'max-content',
            scrollToFirstRowOnChange: true,
          }}
          loading={searchLoading}
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
          {...otherData}
        />
      </div>
    </div>
  );
}
export default Form.create()(ExecutedHistory);
