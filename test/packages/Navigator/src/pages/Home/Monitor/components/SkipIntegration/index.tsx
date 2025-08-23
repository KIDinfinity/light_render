import React, { useState } from 'react';
import { Form, Button, Table, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import Columns from './Columns';
import { monitorParams } from '../../utils';
import { MonitorItemCode } from '../../enum';
import { safeParseUtil } from '@/utils/utils';
import { filterEmptyValue } from '../../utils';
import { centerRequest, markPass } from '@/services/monitorCenterControllerService';
import { handleMessageModal } from '@/utils/commonMessage';
import { FormItemInput } from 'basic/components/Form';
import { Commonbox } from '../index';
import lodash from 'lodash';
import classnames from 'classnames';

function SkipIntegration({ form, isExpand, setExpand }: any) {
  const [list, setList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [markPaskLoading, setMarkPaskLoading] = useState(false);

  const [pagination, setPagination] = useState({ page: 1, pageSize: 0, total: 0 });
  const [sortObj, setSortObj] = useState({ sortName: 'start_time', sortOrder: 'desc' });

  let actualPageSize = pagination.pageSize;
  if (actualPageSize === 0) actualPageSize = isExpand ? 5 : 3;

  const searchHandle = async ({ currentPage = pagination.page, pageSize = actualPageSize }) => {
    if (pagination.total && pageSize * (currentPage - 1) > pagination.total) {
      currentPage = Math.ceil(pagination.total / pageSize);
    }

    const newParams = form.getFieldsValue();
    setList([]);

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

    const response = await centerRequest(
      ...monitorParams(MonitorItemCode.tools_skip_integration, {
        params: filterEmptyValue(newParams),
        currentPage,
        pageSize,
      })
    );
    if (response && response.success) {
      const parseData = safeParseUtil(response.responseData.resultData)?.resultData || {};
      const rows = lodash.map(parseData?.rows, (item, index) => ({
        ...item,
        key: item?.id || index,
      }));
      setList(rows);
      setPagination((item) => ({ ...item, total: parseData?.total, page: currentPage }));
    } else {
      handleMessageModal(response.messageList || response.promptMessages);
    }
    setSearchLoading(false);
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
    searchHandle();
  };

  const pageChangeHandle = (changePage, changePageSize) => {
    if (changePageSize !== actualPageSize)
      setPagination((item) => ({ ...item, page: changePage, pageSize: changePageSize }));
    else setPagination((item) => ({ ...item, page: changePage }));
    searchHandle({ currentPage: changePage, pageSize: changePageSize });
  };

  const handleMarkPask = async () => {
    setMarkPaskLoading(true);

    const response = await markPass(list);

    if (response && response.success) {
      notification.success({ message: 'Mark Pask success!' });
      searchHandle();
    }
    setMarkPaskLoading(false);
  };

  return (
    <Commonbox
      title={formatMessageApi({ Label_COM_MonitorCenter: 'skipIntegration' })}
      click={() => setExpand(!isExpand)}
    >
      <div className={styles.searchBox}>
        <div className={styles.fieldBox}>
          <FormItemInput
            form={form}
            formName="caseNo"
            labelId="CaseNo"
            labelTypeCode="Label_COM_MonitorCenter"
          />

          <FormItemInput
            form={form}
            formName="inquiryBusinessNo"
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
          <Button
            type="primary"
            disabled={lodash.isEmpty(list)}
            block
            className={styles.button}
            onClick={handleMarkPask}
            loading={markPaskLoading}
          >
            {formatMessageApi({ Label_COM_MonitorCenter: 'Mark Pass' })}
          </Button>
        </div>
      </div>
      <div className={classnames(styles.skipIntegrationList, !isExpand && styles.retractedList)}>
        <Table
          columns={Columns({ handleHeaderCell, setList, list })}
          dataSource={list.slice(0, actualPageSize) || []}
          loading={searchLoading}
          scroll={{ x: true }}
          // style={{ whiteSpace: 'nowrap' }}
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
    </Commonbox>
  );
}
export default Form.create()(SkipIntegration);
